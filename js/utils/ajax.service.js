var _ = require('underscore'),
    $ = require('jquery'),
    config = require('../config');

function Ajax() {
    this.requests = [];
    _.bindAll(this, 'addRequest', 'abortAll', 'getRequests');

    $.ajaxSetup(function() {
        timeout : config.timers.request
    });
}

_.extend(Ajax.prototype, {
    /**
     * Add request to the array
     * @param {jQueryAJAX} req : pending request to add
     */
    addRequest: function(req) {
        var self = this,
            i;

        this.requests.push(req);
        i = this.requests.length - 1;
        req.always(function() {
            self.requests.splice(i ,1);
        });
    },

    /**
     * Abort all pending requests
     */
    abortAll: function() {
        _.each(this.requests, function(req) {
            req.abort & req.abort();
        });
    },

    /**
     * Returns array of requests
     */
    getRequests: function() {
        return this.requests;
    }
});

module.exports = new Ajax();