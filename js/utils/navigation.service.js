var analytics = require('./analytics.service'),
    App = require('../app'),
    sports = require('./sports.service'),
    _ = require('underscore'),
    $ = require('jquery'),
    config = require('../config'),
    logger = require('./logger');

function Navigation() {
    var self = this;

    this.pageInitialized = false;
    this.activeView = undefined;
    this.pageViews = {};

    $(document).on('deviceready', function() {
        self.transitions = {
            slide : 'slide',
            default : $.mobile.defaultPageTransition
        };
    });

    this.views = {
        GalleryPageView : require('../galleries/gallery.view'),
        ArticlePageView : require('../headlines/article.view'),
        HeadlinesPageView : require('../headlines/headlines.view'),
        VideoPageView : require('../headlines/video.view'),
        NotificationsPageView : require('../notifications/notifications.view'),
        BoxscorePageView : require('../schedules/boxscore.view'),
        BroadcastPageView : require('../schedules/broadcast.view'),
        EventPageView : require('../schedules/event.view'),
        SchedulePageView : require('../schedules/schedule.view'),
        ScoreboardPageView : require('../schedules/scoreboard.view'),
        SettingsPageView : require('../settings/settings.view')
    };

    //if (services.device.getPlatform() === 'android') {
        //self.transitions.default = self.transitions.slide = 'none';
    //}
}

_.extend(Navigation.prototype, {
    changeActiveView: function (view, params) {
        var pageId = view.id,
            page = $('#' + pageId),
            defaultTransition = this.transitions['default'],
            splashDelay = 300;

        if (!page.length) {
            throw 'Page does not exist';
        }

        this.activeView = view;

        if (config.client.splashDuration) {
            splashDelay = config.client.splashDuration;
        }

        // hiding splash screen
        if (!this.pageInitialized) {
            setTimeout(function () {
                if (navigator && navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
            }, splashDelay);
            this.pageInitialized = true;
        }

        if (params.transition) {
            params.transition = this.transitions[params.transition];
        }

        console.log('Page changed to : ' + '#' + pageId);

        $.mobile.changePage('#' + pageId, _.extend({
            allowSamePageTransition: true,
            changeHash: true,
            transition: defaultTransition
        }, params));

        analytics.track(page);
    },

    getActiveView: function () {
        return this.activeView;
    },

    removePage: function (pageId) {
        this.pageViews[pageId] && delete this.pageViews[pageId];
    },

    openLink: function (view, params) {
        logger.log(JSON.stringify(arguments));
        var self = this,
            pageId = '',
            viewInstance,
            openParams = {},
            viewName = view + 'PageView',
            parentPage = self.activeView;

        params = params || {};

        if (params.transition) {
            openParams.transition = params.transition;
        }

        if (params.direction && params.direction === 'reverse') {
            openParams.reverse = true;
        }

        // set sport if link has data-param-sport attribute
        (!_.isUndefined(params.sport)) && sports.setActiveSport(params.sport);

        // open existing view
        if (params.pageId && params.pageId.length && this.pageViews[params.pageId]) {
            console.log('page exists', params.pageId);
            //this.pageViews[params.pageId].open(openParams);
            this.changeActiveView(this.pageViews[params.pageId], openParams);
            return;
        }

        viewInstance = new this.views[viewName](params, parentPage);

        viewInstance.on('remove', function(pageId) {
            console.log('view remove', pageId);
            self.removePage(pageId);
        });

        // view should has an id
        if (!viewInstance.id) {
            throw 'View should has an ID';
        }

        //if (self.activeView && viewInstance) {
            //console.log(self.activeView.pageType, viewInstance.pageType);
        //}

        if (self.activeView) {
            if (self.activeView.pageType === 'main' && viewInstance.pageType === 'sub') {
                self.activeView.keepAfterHide = true;
            }
        }

        (pageId.length === 0) && (pageId = viewInstance.id);
        viewInstance.promise.then(function () {
            // notify previous view with the view change
            self.activeView && self.activeView.trigger('viewChange', viewInstance.name)

            self.changeActiveView(viewInstance, openParams);
            self.pageViews[pageId] = viewInstance;
        }, function () {
            viewInstance.destroy();
        });

        return pageId;
    }
});

module.exports = new Navigation();