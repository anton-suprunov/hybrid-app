var App = require('../app'),
    config = require('../config'),
    ui = require('../ui'),
    $ = require('jquery'),
    _ = require('underscore'),

    url = require('../utils/url.service'),
    platform = require('../utils/device.service'),
    sports = require('../utils/sports.service'),
    navigation = require('../utils/navigation.service');

function Notifications() {
    var self = this,
        settings = this.getSubsciptions(),
        storedDeviceId = window.localStorage.getItem('notificationsDeviceId');

    self.notificationsUpdateFlag = false;

    // update flag
    self.notificationsUpdateFlag = window.localStorage.getItem('notificationsUpdateFlag');
    self.hasSettings = settings && settings.length > 0;

    console.log('init notifications service');

    //self.initPlugin();

    // device id received
    $.subscribe('/notifications/deviceid', function(deviceId) {
        self.deviceId = deviceId;
        window.localStorage.setItem('notificationsDeviceId', deviceId);
        // device id changed! - resyncing
        if (storedDeviceId !== null && storedDeviceId.length > 0 && storedDeviceId !== deviceId) {
            self.syncNotifications();
        }
    });

    /**
     * sync if syncing flag is true
     * or in case app cache was cleared to remove all the subscriptions
     */
    if (self.notificationsUpdateFlag === 'true' || App.firstLaunch) {
        self.syncNotifications();
    }
}

_.extend(Notifications.prototype, {
    initPlugin : function() {
        var push;

        if (!window.device || !window.device.platform || !window.plugins || !window.PushNotification) {
            return;
        }

        push = PushNotification.init({
            "android": {
                "senderID": config.plugins.genericPush.androidId
            },
            "ios": {
                "alert": "true",
                "badge": "false",
                "sound": "true"
            }
        });

        push.on('registration', $.proxy(this.onRegister, this));
        push.on('notification', $.proxy(this.onNotification, this));
        push.on('error', function(e) {
            //navigator.notification.alert(JSON.stringify(e));
        });
    },

    syncNotifications : function() {
        var self = this,
            storedSerializedList = JSON.parse(window.localStorage.getItem('notificationsSettings')),
            serializedList = '',
            ajaxDataString = $.param({
                platform  : (platform.getPlatform() === 'android') ? 'gcm' : 'ios',
                id : self.deviceId,
                OSVersion : window.device.version,
                FRVersion : config.ver
            }),
            syncURL = '';

        // save flag in local storage
        self.notificationsUpdateFlag = true;
        window.localStorage.setItem('notificationsUpdateFlag', self.notificationsUpdateFlag);

        // abort any previous queries
        if (self.syncQuery && self.syncQuery.abort) {
            self.syncQuery.abort();
        }

        // clear timer if it was set
        if (self.syncTimer) {
            clearTimeout(self.syncTimer);
        }

        // prepare settings list for the GET query
        if (storedSerializedList !== null) {
            $.each(storedSerializedList, function(i, e){
                if (e.value === 'true') {
                    serializedList += '&list=' + e.id;
                }
            });

            ajaxDataString += serializedList;
        }

        syncURL = url.normalizeURL(config.notificationsEndPoint + '?' + ajaxDataString);

        // there is no device Id received yet - timeout syncing
        if (self.deviceId === undefined) {
            self.timeoutSyncing();
            return;
        }

        // start syncing
        //$.publish('loading/started');
        self.syncQuery = $.ajax({
            type : 'GET',
            url : syncURL,
            timeout : 20000
        }).then(function(data) {
            self.notificationsUpdateFlag = false;
            window.localStorage.setItem('notificationsUpdateFlag',  self.notificationsUpdateFlag);

            // error = 2 - missing or invalid parameter, no timeout in this case
            if (data.error === 2) {
                ui.alert('There was an error while saving your preferences', 'Notifications error');
            }

            // error = 1 - notifications disabled through a property on website
            if (data.error === 1) {
                ui.alert('Notifications are disabled', 'Notifications error');
            }
        }, function() {
            self.timeoutSyncing();
        });

    },

    timeoutSyncing : function() {
        var self = this;

        self.syncTimer = setTimeout(function(){
            self.syncNotifications();
        }, 30000);
    },

    onRegister : function(data) {
        data.registrationId && $.publish('/notifications/deviceid', [data.registrationId]);
    },

    onNotification : function(data) {
        var sport,
            title = 'Notification',
            targetSport;

        $.publish('/notifications/received');
        sport = sports.getSportBySportCode(data.additionalData.open);

        if (sport) {
            title = config.client.sports[sport].title;
        }

        _.defer(function() {
            ui.alert(data.message,  title, function() {
                if (data.additionalData.open) {
                    targetSport = sports.getSportBySportCode(data.additionalData.open);
                    navigation.openLink('Scoreboard', {
                        pageId : 'scoreboard-page-' + targetSport
                    });
                }
            });
        });
    },

    getSubsciptions : function() {
        return JSON.parse(window.localStorage.getItem('notificationsSettings'));
    },

    saveSubscriptions : function(list) {
        window.localStorage.setItem('notificationsSettings', JSON.stringify(list));
    },

    getDeviceId : function() {
        return this.deviceId;
    }
});

module.exports = new Notifications();