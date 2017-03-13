var App = require('./app'),
    config = require('./config'),
    ui = require('./ui'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),

    helpers = require('./helpers'),
    templates = require('./templates'),
    device = require('./utils/device.service'),
    navigation = require('./utils/navigation.service'),
    connection = require('./utils/connection.service');

var AppView = Backbone.View.extend({

    el : 'body',

    events : {
        'tap .link' : '_handleViewLink',
        'tap .external-link' : '_handleExternalLink',
        'tap .system-browser-link' : '_handleSystemLink',
        'tap .footer-btn' : '_handleFooterBtn'
    },

    initialize : function() {
        _.bindAll(this, '_handleViewLink', '_handleExternalLink' , '_handleSystemLink');
        this.$el.addClass(device.getPlatform());
        this.render();
    },

    render : function() {
        this.$el.append(templates['photoswipe-base']());
    },

    _handleViewLink : function(e) {
        var link = $(e.currentTarget),
            pageId, params;

        //console.log('link tapped', link, link.data('paramPageId'));

        if (link.hasClass(config.classes.btnActive) && link.hasClass(config.classes.persist)) {
            e.stopImmediatePropagation();
            e.preventDefault();
            return;
        }

        // grab only data-param values
        params = helpers.dataWildcard(link, 'param');
        pageId = navigation.openLink(link.data('view'), params);

        if (!params.pageId) {
            link.data('paramPageId', pageId);
        }

        e.preventDefault();
    },

    _handleExternalLink : function(e) {
        var link = $(e.currentTarget),
            url = link.attr('href'),
            ref,
            location = 'yes';

        if (link.hasClass('link-Audio') || link.hasClass('link-Video')) {
            location = 'no';
        }

        ref = ui.openExternalLink(url, {
            location : location
        });

        // let phone go to sleep again once in app browser closed
        ref.addEventListener('exit', function() {
            window.plugins.insomnia.allowSleepAgain();
        });

        // keep phone awake
        window.plugins.insomnia.keepAwake();

        _.defer(function() {
            link.removeClass(config.classes.btnActive + ' ui-focus')
                .parents('.ui-btn').removeClass(config.classes.btnActive + ' ui-focus');
        });

        e.preventDefault();
    },

    _handleSystemLink : function(e) {
        var link = $(e.currentTarget),
            targetURL = link.attr("href");

        ui.openSystemLink(targetURL);
        link.removeClass(config.classes.btnActive + ' ui-focus');

        e.preventDefault();
    },

    _handleFooterBtn : function(e) {
        var self = this;

        if (connection.isOffline) {
            _.delay(function() {
                self.$('.footer-btn')
                    .removeClass(config.classes.btnActive)
                    .filter('.ui-state-persist')
                    .addClass(config.classes.btnActive);
            }, 1000);
        }
    }
});

module.exports = AppView;