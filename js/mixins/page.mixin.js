var App = require('../app'),
    helpers = require('../helpers'),
    ui = require('../ui'),
    config = require('../config'),
    $ = require('jquery'),
    _ = require('underscore'),

    NavigationView = require('../navigation/navigation.view'),
    connection = require('../utils/connection.service'),
    url = require('../utils/url.service'),
    ajax = require('../utils/ajax.service'),
    sports = require('../utils/sports.service'),
    loader = require('../utils/loader.service'),
    favSports = require('../schedules/fav-sports.service'),
    templates = require('../templates'),
    WebPullToRefresh = require('pull-to-refresh'),
    device = require('../utils/device.service');

var pageMixin = {

    pageType : 'main',
    events : {
        'pagecreate': '_pageCreate',

        'pageshow' : '_pageShow',
        'pagehide' : '_pageHide',
        'pagebeforehide' :'_pageBeforeHide',

        'pagerefresh' : '_pageRefresh',
        'pagebeforerefresh' : '_pageBeforeRefresh',

        'tap .type-trigger' :'_handleTypeTriggerLink',

        'swiperight .ui-content' : '_openNavigation',
        'tap .icon-list' : '_openNavigation',

        'tap .header .icon-sport-fav' : '_handleSportFav',
        'tap .icon-share' : '_handleShareLink'
    },

    selectors : {
        pageBody : '.page-body'
    },

    /**
     * refreshable flag will set page for auto refresh
     */
    refreshable : false,

    /**
     * mixins functions are called after constructor functions in Cocktail
     * it means that mixin properties won't be available in constructor initialize functions
     * to overcome this constructors implement _oninitialize function, that is called after setup is completed
     * */
    initialize : function(options, parentView) {
        var self = this;

        this.options = options;
        this.promise = $.Deferred(); // initial load promise
        this.page = null; // actual paqe content
        this.uiPage = null; // jQuery Mobile's ui-page wrapper
        this.updateFlag = false;
        this.parentView = parentView;

        this.defaultTemplateData = {
            refreshable : false,
            headerSportFav : false,
            platform : device.getPlatform(),
            client : config.client,
            verMinor : config.verMinor,
            ver : config.ver,
            packageIdPrefix : config.packageIdPrefix,
            title : sports.getActiveSportTitle(),
            backButtonLabel : 'Back',
            parentViewId : (this.parentView ? this.parentView.id : undefined),
            parentViewName : (this.parentView ? this.parentView.name : undefined)
        };

        //console.log(this.parentView);

        this.refreshPeriod = config.timers.appUpdate;

        _.bindAll(this, '_reject', 'refresh', '_favSportsChange');

        // page id is brought from the options (link data attribute), eg in case of dynamic pages, like event
        if (this.options.pageId && !this.templateData.pageId) {
            this.templateData.pageId = this.options.pageId;
        }

        // if there is no page id on link nor built one, random id will be used
        if (!this.templateData.pageId) {
            this.templateData.pageId = helpers.generatePageId(this.name);
        }

        if (!this.id && this.templateData.pageId) {
            this.id = this.templateData.pageId;
        }

        this.url = this.url || this.options.url;

        if (this.options.transition) {
            this.transition = options.transition;
        }

        (this.refreshable) && this._autoRefresh();

        if (this.url) {
            this.url = url.normalizeURL(this.url);

            this._load()
                .then(function() {
                    self._oninitialize && self._oninitialize();
                    self.render();
                    self._initUI();
                    self._resolve();
                }, self._reject);
        } else {
            self._oninitialize && self._oninitialize();
            self.render();
            self._initUI();
            self._resolve();
        }

        // update fav sport icon in header
        $.subscribe('sports/favourite/add', this._favSportsChange);
        $.subscribe('sports/favourite/remove', this._favSportsChange);
    },

    /**
     * mixin render fn called after constructor render,
     * it runs only once and wraps this.page into jquery mobile ui-page using main-page or sub-page template
     * then it calls App's createPage method to insert page into DOM and initialize with jquery mobile
     * finally Backbone's setElement method is called to update this.el property
     * */
    render : function() {
        var template = templates['main-page'],
            templateData = {};

        // exit if uiPage already rendered or page not rendered
        if (!this.page || this.uiPage === this.$el) {
            return;
        }

        if (this.pageType === 'sub') {
            template = templates['sub-page'];
        }

        _.extend(templateData, this.defaultTemplateData, {
            page : this.page,
            url : this.url
        }, this.templateData);

        this.uiPage = $(template(templateData));

        this.setElement(this.uiPage);
        ui.createPage(this.uiPage);
    },

    destroy : function() {
        this.trigger('remove', [this.id]);
        this.remove();
    },

    refresh : function(hideSpinner) {
        var self = this;

        if (!this.url || connection.isOffline) {
            return $.Deferred().reject(false);
        }

        this.$el.trigger('pagebeforerefresh');

        return this
            ._load(hideSpinner)
            .then(function() {
                var pageBodyContainer = self.$(self.selectors.pageBody);

                self.render();
                pageBodyContainer.html(self.page);
                ui.refreshLayout(pageBodyContainer);
                self._initUI(true);

                self.$el.trigger('pagerefresh');
            });
    },

    refreshAfterDisconnect : function() {
        if (this.refreshable) {
            if (this !== self.activeView) {
                this._setUpdateFlag();
            } else {
                this.refresh();
            }
        }
    },

    _resolve : function() {
        this.promise.resolve();
    },

    _reject : function() {
        this.promise.reject();
    },

    _load : function(hideSpinner) {
        var jqxhr,
            self = this;

        !hideSpinner && loader.show();
        if (this.dataType === 'JSON') {
            jqxhr = $.getJSON(this.url);
        } else {
            jqxhr = $.get(this.url);
        }

        ajax.addRequest(jqxhr);

        jqxhr.then(function(data) {
            !hideSpinner && loader.hide();
            self.data = data;
        }, function() {
            !hideSpinner && loader.hide(true);
        });

        return jqxhr;
    },

    _initUI : function(afterRefresh) {
        if (this.pageType !== 'sub' && !afterRefresh) {
            this.navigationView = new NavigationView({
                el : this.$('[data-role="panel"]'),
                parentView : this
            });
        }
    },

    _handleTypeTriggerLink : function(e) {
        var type = $(e.currentTarget).data('type'),
            currentType = this.$el.data('type') ? this.$el.data('type') : config.typeSchedule;

        if (currentType === type) {
            return;
        }

        this._changeType(type);

        this.$('.header-subtabs').find('.type-trigger')
            .removeClass(config.classes.persist)
            .filter('[data-type="' + type + '"]').addClass(config.classes.persist);

        e.preventDefault();
    },

    _refreshUI : function() {
        ui.refreshLayout(this.$el);
    },

    // generates urls with client website, current version and a sport module url from client.js
    _getURL : function() {
        var res = config.client.sports[sports.getActiveSport()].urls[this.type];
        return url.mergeParamsIntoURL(config.client.website + res + (res.indexOf('?') !== -1 ? '&' : '?') + 'tmpl=fr-v' +
            config.ver + '-' + this.type + '-template', this.type);
    },

    _pageCreate : function(e) {
        var self = this,
            wptr,
            ptr = $('.ptr');

        // init pull to refresh
        if (this.$('.ptr-content').length > 0) {
            wptr = new WebPullToRefresh({
                ptrEl: ptr.get(0),
                contentEl: this.$('.ptr-content').get(0),
                loadingFunction: function() {
                    return self.refresh(true);
                }
            });
            this.$el.on('panelbeforeopen', function() {
                wptr.isTouchInProgress() && wptr.stop();
            });
        }
    },

    _pageShow : function(e) {
        var activeType = this.$el.data('type') || config.defaultType[this.type],
            self = this;

        if (this.pageType !== 'sub') {
            //console.log(activeType);
            activeType = this.$el.data('type') || config.defaultType[this.type],
                this._changeType(activeType);
        }

        // fix the 1px page content scroll so that pull to refresh works with first attempt
        _.defer(function () {
            $(window).scrollTop(0);
        });

        // show pull to refresh back
        $('.ptr').show();

        // check if page has sub-tabs and in this case assign a body class, so pull to refresh positioned correctly
        this.hasSubTabs ? App.pageContainer.addClass('has-subtabs') : App.pageContainer.removeClass('has-subtabs');

        if (this.updateFlag) {
            this.refresh()
                .done(function () {
                    self.updateFlag = false;
                });
        }

        this.keepAfterHide = false;
    },

    _pageBeforeHide : function(e) {
        // return highlight to current sport in sport nav
        this.navigationView && this.navigationView.resetHighlight();

        // hide pull to refresh so it's not visible during transitions
        $('.ptr').hide();
    },

    _pageRefresh : function(e) {
        var activeType = this.$el.data('type') || config.defaultType[this.type];
        this._changeType(activeType);
    },

    _pageHide : function() {
        if (!this.keepAfterHide) {
            this.destroy();
        }
    },

    _openNavigation : function() {
        this.navigationView && this.navigationView.open();
    },

    _autoRefresh : function(reloadTest) {
        var self = this,
            timer, query;

        console.log('this page will auto refresh each ' + this.refreshPeriod/1000 + ' seconds');

        function startTimer() {
            timer = setInterval(function() {
                if (self.autoRefreshTest === undefined || self.autoRefreshTest()) {
                    query = self.refresh();
                }
            }, self.refreshPeriod);
        }

        $(document).on('pageshow', '#' + this.id, startTimer);
        if (this.$el === $.mobile.activePage) {
            startTimer();
        }

        $(document).on('pagehide', '#' + this.id, function() {
            clearInterval(timer);
        });
    },

    _changeType : function(type) {
        var container = this.$('.ui-content');

        if (container.find('.type-container').length > 1) {
            container.find('.type-container')
                .addClass('hidden')
                .filter('[data-type=' + type + ']').removeClass('hidden');
        }

        this.$el.data('type', type);
    },

    _setUpdateFlag : function() {
        this.updateFlag = true;
    },

    _handleSportFav : function(e) {
        favSports.favSport(sports.getActiveSport());
        e.preventDefault();
    },

    _favSportsChange : function(sport) {
        if (this.sport && this.sport === sport) {
            this.$('.header .icon-sport-fav')
                .toggleClass('icon-sport-fav-active');
        }
    },

    _handleShareLink : function(e) {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
            //message: 'share this', // not supported on some apps (Facebook, Instagram)
            //subject: 'the subject', // fi. for email
            //files: ['', ''], // an array of filenames either locally or remotely
            url: url.normalizeURL(this.options.websiteUrl, true)
            //chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        };

        e.preventDefault();

        (this._getShareDetails) && _.extend(options, this._getShareDetails());

        if (!window.plugins.socialsharing) {
            return;
        }

        window.plugins.socialsharing.shareWithOptions(options, function(result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }, function(msg) {
            console.log("Sharing failed with message: " + msg);
        });
    }
};

module.exports = pageMixin;