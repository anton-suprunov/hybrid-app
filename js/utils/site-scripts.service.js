var $ = require('jquery'),
    _ = require('underscore'),
    helpers = require('../helpers'),
    config = require('../config'),
    loadJS = require('loadJS');

function SiteScripts() {
    var load = window.requirejs.load;
    window.requirejs.load = function(context, moduleId, url) {
        if (moduleId === 'jquery') {
            url = 'vendor/jquery-2.2.4.js';
        } else if (!helpers.isAbsoluteUrl(url)) {
            url = config.client.website + (url.indexOf('/') !== 0 ? '/' : '') + url;
        } else if (url.indexOf('//') === 0) {
            url = 'http:' + url;
        }

        return load(context, moduleId, url);
    };
}

_.extend(SiteScripts.prototype, {
    initWebsiteJs : function() {
         //make local jquery instance globally available, so it's picked by website's main.js
        window.jQuery = $;
        loadJS(config.client.website + '/info/main.js');
    },
    update : function() {
        $(document).trigger('dom_updated');
    }
});

module.exports = new SiteScripts();