var _ = require('underscore'),
    $ = require('jquery'),
    config = require('../config'),
    sports = require('./sports.service');

function Analytics() {
    var self = this;

    this.enabled = false;
    if (config.client.GA) {
        if (window.plugins && window.plugins.gaPlugin) {
            window.plugins.gaPlugin.init(function() {
                self.enabled = true;
            }, function(e){}, config.client.GA, 10);
        }
    }
}

_.extend(Analytics.prototype, {
    /**
     * Tracks a page change
     */
    track : function(page) {
        var GAUrl,
            url = page.data('pageUrl');
        if (this.enabled) {
            if (url.length > 0) {
                url = url.substring(0, url.indexOf('?'));
            }

            if ($.mobile.activePage.hasClass('static-page')) {
                GAUrl = $.mobile.activePage.data('gaTitle');
            } else {
                GAUrl = sports.getActiveSportTitle() + ' / ' + $.mobile.activePage.data('gaTitle') + ' / ' + url;
            }

            window.plugins.gaPlugin.trackPage(function() {
                console.log('success', arguments);
            }, function() {
                console.log('error', arguments);
            }, GAUrl);
        }
    }
});

module.exports = new Analytics();