var _ = require('underscore'),
    $ = require('jquery'),
    config = require('./config');

module.exports = {
    alert : function(message, title, cb) {
        cb = cb || function() {};
        if (!config.test) {
            navigator.notification.alert(message, cb, title);
        } else {
            //alert(message);
            //cb();
        }
    },

    openSystemLink : function(url) {
        return window.open(url, "_system");
    },

    openExternalLink : function(url, opts) {
        var params = _.extend({
            location : 'yes'
        }, opts);
        return window.open(url, '_blank', $.param(params));
    },

    refreshLayout : function(el) {
        el.trigger('create');
    },

    createPage : function(page){
        page.prependTo($.mobile.pageContainer);
        return page.page();
    }
};

