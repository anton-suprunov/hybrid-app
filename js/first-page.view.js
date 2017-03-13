var App = require('./app'),
    config = require('./config'),
    ui = require('./ui'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    templates = require('./templates');

var FirstPageView = Backbone.View.extend({

    el : '#first-page',

    events : {},

    template : templates['first-page'],

    initialize : function() {
        this.render();
        ui.refreshLayout(this.$el);
    },

    render : function() {
        this.$el.html(this. template({
            pageId : 'first-page',
            appName : config.client.appName
        }));
    },

    showContent : function() {
        this.$el.addClass('first-page_show-content');
    }
});

module.exports = FirstPageView;

