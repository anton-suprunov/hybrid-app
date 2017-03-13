/**
 * TODO: convert string configurations into objects eg pageType: 'sub'
 * TODO: splashes looks stretched on android
 * TODO: site modules update fires several times for dom objects that were already removed (unbind events?)
 * TODO: prevent footer (and other?) links from firing more then once (block ui)
 * TODO: first launch on ios results in white screen navigation? bug
 * */
var App = {};
module.exports = App;

var $ = require('jquery'),
    _ = require('underscore'),

    helpers = require('./helpers'),
    config = require('./config'),

    loadJS = require('loadJS'),

    AppView = require('./app.view'),
    FirstPageView = require('./first-page.view'),

    navigation = require('./utils/navigation.service'),
    notifications = require('./notifications/notifications.service'),
    messages = require('./utils/messages.service'),
    ajax = require('./utils/ajax.service'),
    device = require('./utils/device.service'),
    settings = require('./settings/settings.service'),
    siteScripts = require('./utils/site-scripts.service'),

    logger = require('./utils/logger');


App.init = function() {
    var self = this;

    console.log(config.client.appName + ' v' + config.ver);
    console.log(config.client.website);

    self.pageContainer = $.mobile.pageContainer;
    self.firstLaunch = true;

    _.bindAll(self, '_setSettingClass', '_initNotificationsOnFirstLaunch');

    // status bar is hidden by default in configuration, time to show it
    window.StatusBar && StatusBar.overlaysWebView(false) && StatusBar.show();

    // only init notifications plugin at this moment because it needs jQuery Mobile to run first
    notifications.initPlugin();

    // detect if app is running for the first time and save a launched flag in local storage
    if (window.localStorage.getItem('wasLaunched')) {
        self.firstLaunch = false;
    } else {
        window.localStorage.setItem('wasLaunched', true);
    }

    self._bindSubscriptions();

    // adds an "android" or "ios" class to the body tag for CSS usage
    self.pageContainer.addClass(device.getPlatform());

    _.each(settings.getSettings(), self._setSettingClass);

    // main view
    self.appView = new AppView();

    // open first page
    navigation.openLink('Scoreboard');

    // load website's main.js
    siteScripts.initWebsiteJs();

    //logger.init();

}; // app constructor

/**
 * Assign proper class names for configured setting
 * @param {string} value - value of a setting
 * @param {string} name - name of a setting
 * */
App._setSettingClass = function(value, name) {
    this.pageContainer.removeClass(function(i, className) {
        var classes = className.split(' '),
            classToRemove = '';

        _.each(classes, function(v, i) {
            if (v.indexOf('setting-' + name) === 0) {
                classToRemove = v;
            }
        });
        return classToRemove;
    });
    this.pageContainer.addClass('setting-' + name + '-' + value);
};

/**
 * Send redirect for the notifications page in case of app's first launch
 * will wait till all requests are finished if there are some
 * */
App._initNotificationsOnFirstLaunch = function() {
    var self = this,
        requests = ajax.getRequests();

    if (requests.length > 0) {
        $.when.apply($, requests)
            .then(function() {
                navigation.openLink('Notifications', {
                    firstLaunch : true,
                    pageId : 'notifications-page'
                });
            });
    } else {
        navigation.openLink('Notifications', {
            firstLaunch : true,
            pageId : 'notifications-page'
        });
    }
};

App._bindSubscriptions = function() {
    var self = this;

    // Notifications workflow on app first launch
    if (self.firstLaunch && !notifications.hasSettings) {
        $.subscribe('/notifications/deviceid', self._initNotificationsOnFirstLaunch);
    }

    $.subscribe('connection/offline', function() {
        if (!self.pageViews['scoreboard-page-0']) {
            self.pageViews['first-page'] = new FirstPageView();
        } else {
            messages.show(config.client.appName + config.messages.noConnection);
        }
    });

    // show failed message but not for the notifications syncing
    $.subscribe('connection/offlineRequest', function(xhr, opts) {
        if (opts.url.indexOf(config.notificationsEndPoint) === -1) {
            messages.show(config.client.appName + config.messages.noConnection);
        }
    });

    $.subscribe('connection/online', function() {
        if (!self.pageViews['scoreboard-page-0']) {
            navigation.openLink('Scoreboard');
        } else {
            _.each(self.pageViews, function(view) {
                view.refreshAfterDisconnect();
            });
        }
    });

    // abort any page loads if notification has been received
    $.subscribe('/notifications/received', ajax.abortAll);

    $.subscribe('settings/change', function(name, value) {
        self._setSettingClass(value, name);
    });
};
