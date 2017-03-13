var _ = require('underscore'),
    config = require('../config'),
    helpers = require('../helpers'),
    sports = require('./sports.service'),
    $ = require('jquery');

function Url() {}

_.extend(Url.prototype, {
    // creates absolute URL
    normalizeURL : function(url, usePublic) {
        var website = config.client.website;

        usePublic && (website = config.client.websitePublic);

        if (! url) {
            return '';
        }

        // replace spaces with %20
        url = url.replace(/\s/g, '%20');

        // handle protocol relative urls
        if (url.indexOf('//') === 0) {
            url = 'http:' + url;
        }

        if (helpers.isExternalURL(url)) {
            return url;
        } else {
            website = config.client.website;
            return website + url;
        }
    },

    // URL parameters merging from client.js : global module params + sport specific params
    mergeParamsIntoURL : function(url, type) {
        var urlParams = {},
            urlToMerge,
            activeSport = sports.getActiveSport();

        if (config.client.urlParams && config.client.urlParams[type]) {
            _.extend(urlParams, config.client.urlParams[type]);
        }

        if (config.client.sports[activeSport].params) {
            _.extend(urlParams, config.client.sports[activeSport].params);
        }

        urlToMerge = $.param(urlParams);

        if (urlToMerge.length > 0) {
            if (url.indexOf('?') !== -1) {
                url += '&' + urlToMerge;
            } else {
                url += '?' + urlToMerge;
            }
        }

        return url;
    }
});

module.exports = new Url();