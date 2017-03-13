var _ = require('underscore'),
    $ = require('jquery');

function Loader() {}

_.extend(Loader.prototype, {
    show : function() {
        $.mobile.loading('show');
        ++self.runningProcesses;
    },

    hide : function(force) {
        if (--self.runningProcesses === 0 || force) {
            $.mobile.loading('hide');
        }
    },

    runningProcesses : 0
});

module.exports = new Loader();