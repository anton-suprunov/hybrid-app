var App = require('../app'),
    config = require('../config'),
    url = require('../utils/url.service'),
    $ = require('jquery'),
    _ = require('underscore');

function NavbarMore() {
    this.def = this.load();
}

_.extend(NavbarMore.prototype, {
    getItems : function() {
        var def = $.Deferred(),
            self = this;

        if (this.data) {
            def.resolve(this.data);
        } else {
            this.def.then(function(data) {
                self.data = data;
                def.resolve(self.data);
            }, function() {
                def.reject();
            });
        }

        return def;
    },

    load : function() {
        return $.getJSON(url.normalizeURL(config.navbarMore + '?tmpl=fr-v' + config.ver + '-navbar-template'));
    }
});

module.exports = new NavbarMore();