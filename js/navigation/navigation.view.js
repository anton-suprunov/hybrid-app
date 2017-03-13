var App = require('../app'),
    config = require('../config'),
    ui = require('../ui'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    IScroll = require('iscroll'),

    favSports = require('../schedules/fav-sports.service'),
    sports = require('../utils/sports.service'),
    connection = require('../utils/connection.service'),
    navbarMore = require('../navigation/more-navbar.service'),
    templates = require('../templates');

var NavigationView = Backbone.View.extend({

    events : {
        'tap .nav-sport-trigger' : '_handleSportLink',
        'tap .sub-panel-trigger' : '_triggerSubPanel',
        'tap .sub-panel-close' : '_closeSubPanel',
        'tap .icon-sport-fav' : '_sportFav',
        'tap .sport-fav' : '_sportFav',
        'tap .link' : '_linkTap',
        'tap .nav-sponsor-link' : '_sponsorClick',

        'panelbeforeclose' : '_closeSubPanels',
        'panelbeforeopen' : '_resetScroll'
    },

    template : templates.navigation,
    openedSubPanels : [],

    initialize : function(options) {
        var self = this;

        _.bindAll(this, 'open', 'close', '_openSubPanel', '_toggleFavSport');

        this.options = options;
        this.iScrollHandlers = [];
        this.favSportsUpdated = false;

        this.render();
        this._initIscroll();

        $.subscribe('sports/favourite/add', self._toggleFavSport);
        $.subscribe('sports/favourite/remove', self._toggleFavSport);
    },

    render : function() {
        this.$el.html(this.template({
            favSports : favSports.getFavSports(),
            sports : config.client.sports,
            groupedSports : sports.getGroupedSports(),
            showSponsorLogo : config.client.showSponsorLogo || false,
            sponsorLogoURL : config.client.sponsorLogoURL || '',
            parentViewId : this.options.parentView.id,
            parentViewName : this.options.parentView.name,
            website : config.client.website,
            appName : config.client.appName
        }));
        this._renderNavbarMore();
        ui.refreshLayout(this.$el);
    },

    refresh : function() {
        this.render();
        ui.refreshLayout(this.$el);
    },

    open : function() {
        if (! this.$el.hasClass('ui-panel-open')) {
            this.$el.panel('open');
        }
    },

    close : function() {
        this.$el.panel('close');
    },

    resetHighlight : function() {
        this.$el.find('.nav-sport-trigger').removeClass(config.classes.btnActive)
            .filter('[data-active=true]').addClass(config.classes.btnActive);
    },

    isOpened : function() {
        return this.$el.hasClass('ui-panel-open');
    },

    _handleSportLink : function(e) {
        var link = $(e.currentTarget);

        if (!connection.isOffline) {
            this.$el.find('.nav-list li .nav-sport-trigger').removeClass(config.classes.btnActive);
            link.addClass(config.classes.btnActive);
        } else {
            this.resetHighlight();
        }
    },

    _closeSubPanels : function() {
        this.$el.find('.ui-sub-panel')
            .addClass('ui-sub-panel-close ui-sub-panel-animate')
            .removeClass('ui-sub-panel-open');

        this.openedSubPanels = [];
    },

    _triggerSubPanel : function(e) {
        var link = $(e.currentTarget),
            subPanel = this.$el.find('.ui-sub-panel[data-id="' + link.data('target') + '"]');

        this._openSubPanel(subPanel);

        if (_.indexOf(this.openedSubPanels, subPanel) === -1) {
            this.openedSubPanels.push(subPanel);
        }

        e.preventDefault();
    },

    _openSubPanel : function(subPanel) {
        subPanel
            .addClass('ui-sub-panel-open ui-sub-panel-animate')
            .removeClass('ui-sub-panel-close');
    },

    _closeSubPanel : function(e) {
        var subPanel = $(e.currentTarget).closest('.ui-sub-panel');

        subPanel
            .addClass('ui-sub-panel-close ui-sub-panel-animate')
            .removeClass('ui-sub-panel-open');

        this.openedSubPanels = _.without(this.openedSubPanels, subPanel);

        e.preventDefault();
    },

    _sportFav : function(e) {
        var link = $(e.currentTarget);
        favSports.favSport(link.data('sport'));

        e.preventDefault();
    },

    _toggleFavSport : function(sport) {
        var sportFavTrigger = this.$el.find('.fav-sports-select-list').find('.icon-sport-fav[data-sport="' + sport + '"]'),
            sportFavLink = this.$el.find('.nav-list_main > .nav-sport[data-sport="' + sport + '"]');

        sportFavTrigger.toggleClass(sportFavTrigger.data('activeClass'));
        sportFavLink.toggleClass('hidden');

        if (this.isOpened()) {
            this._refreshMainScroll();
        } else {
            this.favSportsUpdated = true;
        }
    },

    _renderNavbarMore : function() {
        var self = this;

        navbarMore.getItems().then(function(data) {
            self.$el.find('.nav-list_main').append(templates['more-navbar']({ links : data }));
            self._refresh();
        });
    },

    _refresh : function() {
        this.$el.trigger("updatelayout");
    },

    _initIscroll : function() {
        var self = this;

        this.$el.one('panelbeforeopen', function() {
            self.$('.nav-iscroll-wrapper').each(function() {
                self.iScrollHandlers.push(new IScroll(this, {
                    bounce : false
                }));
            });
        });
    },

    _resetScroll : function() {
        if (! this.iScrollHandlers.length) {
            return;
        }
        _.each(this.iScrollHandlers, function(e, i) {
            e.scrollTo(0, 0);
        });

        if (this.favSportsUpdated) {
            this._refreshMainScroll();
            this.favSportsUpdated = false;
        }
    },

    // toggle first iscroll handler to update main navigation height
    _refreshMainScroll : function() {
        this.iScrollHandlers[0].refresh();
    },

    _linkTap : function(e) {
        _.delay(this.close, 300);
    },

    _sponsorClick : function(e) {
        var link = $(e.currentTarget),
            url = link.attr('href');

        window.plugins.gaPlugin.trackEvent(function() {}, function() {}, "Sponsor", "Clicked", url, 1);
        App.openSystemLink(url);

        e.preventDefault();
    }
});

module.exports = NavigationView;