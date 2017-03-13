var _ = require('underscore'),
    $ = require('jquery'),
    config = require('../config');

function Device() {
    var self = this;

    $(document).on("deviceready", function() {
        self.setPlatform();
        self.lockOrientation();
    });
}

_.extend(Device.prototype, {
    getPlatform : function() {
        return this.platform;
    },

    setPlatform : function() {
        var platformsTests = {
                ios: /(iPhone|iPod|iPad)/,
                android: /Android/
            },
            self = this;

        this.platform = '';

        _.each(platformsTests, function(e, i) {
            if (window.device.platform.match(e)) {
                self.platform = i;
            }
        });
    },

    lockOrientation: function() {
        var width;

        if (!screen.lockOrientation) return;

        width = Math.min(window.innerWidth, window.innerHeight);

        if (width < config.portraitOrientationLock) {
            screen.lockOrientation('portrait')
        }
    }
});

module.exports = new Device();