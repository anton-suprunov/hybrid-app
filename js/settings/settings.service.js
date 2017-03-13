var _ = require('underscore'),
    $ = require('jquery');

function Settings() {
    this.settings = _.extend({
        useLocalTimeZone : false,
        hideScores : false,
        articleTextSize : '2'
    }, JSON.parse(window.localStorage.getItem('settings')));
}

_.extend(Settings.prototype, {
    save : function(name, value) {
        console.log(arguments);
        this.settings[name] = value;
        $.publish('settings/change', [name, value]);
        this._save();
    },

    getSetting : function(name) {
        return this.settings[name];
    },

    getSettings : function() {
        return this.settings;
    },

    _save : function() {
        window.localStorage.setItem('settings', JSON.stringify(this.settings));
    }
});

module.exports = new Settings();