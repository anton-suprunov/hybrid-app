var _ = require('underscore'),
    $ = require('jquery');

function Connection() {
    _.bindAll(this, '_onbeforesend', '_ononline', '_onoffline');

    document.addEventListener('online', this._ononline);
    document.addEventListener('offline', this._onoffline);

    $.ajaxSetup({
        beforeSend: this._onbeforesend
    });
}

_.extend(Connection.prototype, {
    _ononline : function() {
        if (this.isOffline) {
            this.isOffline = false;
            $.publish('connection/online');
        }
    },

    _onoffline : function() {
        if ((navigator.connection.type === Connection.NONE || navigator.connection.type === Connection.UNKNOWN) &&
            !this.isOffline) {
            this.isOffline = true;
            $.publish('connection/offline');
        }
    },

    _onbeforesend : function (xhr, opts) {
        if (this.isOffline) {
            xhr.abort();
            $.publish('connection/offlineRequest', [xhr, opts]);
        }
    }
});

module.exports = new Connection();