var App = require('../app'),
    config = require('../config'),
    ui = require('../ui'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    pageMixin = require('../mixins/page.mixin'),

    notifications = require('../notifications/notifications.service'),
    connection = require('../utils/connection.service'),
    messages = require('../utils/messages.service'),
    templates = require('../templates');

var NotificationsPageView = Backbone.View.extend({

    templateData : {
        addBackButton : true,
        title : 'Notifications',
        gaTitle : 'Notifications',
        pageId : 'notifications-page'
    },
    dataType : 'JSON',
    pageType : 'sub',
    template : templates['notifications-page'],
    events : {
        'slidestop' : '_handleSlide'
    },

    initialize : function() {
        this.url = config.notificationsEndPoint;
        _.bindAll(this, '_handleSlide');
    },

    render : function() {
        if (this.data.error !== undefined) {
            this._handleError(data.error);
        }

        this.page = this.template({
            notifications : this.data
        });
    },

    _handleSlide : function(event, ui) {
        var select = $(event.target);
        console.log(select);
        var listSerialized = $.map(this.$el.find('select.sport-slider').serializeArray(), function(e) {
            return {
                "id" : e.name,
                "value" : e.value
            };
        });

        if (connection.isOffline) {
            messages.show(config.client.appName + config.messages.noConnection);
            select.val('false').slider('refresh');
            return;
        }

        notifications.saveSubscriptions(listSerialized);
        notifications.syncNotifications();

        if (!notifications.deviceId) {
            ui.alert('To enable notifications, go to settings -> notifications, select ' + config.client.appName +
                ' and turn ON notification center and view in lock screen', 'Notifications error');
        }
    },

    // update selects with locally stored preferences
    _initUI : function() {
        var subscriptions = notifications.getSubsciptions(),
            selects = this.$el.find('select.sport-slider');

        if (subscriptions) {
            $.each(subscriptions, function(i, e) {
                if (e.value === 'true') {
                    selects.filter('[name=' + e.id + ']').val('true').slider('refresh');
                }
            });
        }

        if (this.options.firstLaunch) {
            _.delay(function() {
                ui.alert(config.messages.notificationsFirstLaunch, 'Notifications notice');
            }, 1000);
        }
    },

    _handleError : function(err) {
        // no lists added to site
        if (err === 0) {
            ui.alert('No subscriptions lists found', 'Notifications error');
        }
        // notifications disabled for the given site
        if (err === 1) {
            ui.alert('Notifications disabled', 'Notifications error');
        }
        //def.fail();
    }
});

Cocktail.mixin(NotificationsPageView, pageMixin);
module.exports = NotificationsPageView;