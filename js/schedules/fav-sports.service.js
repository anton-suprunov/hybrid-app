var _ = require('underscore'),
    $ = require('jquery');

function FavSports() {
    this.favSports = JSON.parse(window.localStorage.getItem('favSports')) || [];
}

_.extend(FavSports.prototype, {
    favSport : function(sport) {
        if (_.indexOf(this.favSports, sport) === -1) {
            this.favSports.push(sport);
            $.publish('sports/favourite/add', [sport]);
        } else {
            this.favSports = _.without(this.favSports, sport);
            $.publish('sports/favourite/remove', [sport]);
        }
        window.localStorage.setItem('favSports', JSON.stringify(this.favSports));
    },

    getFavSports : function() {
        return this.favSports;
    }
});

module.exports = new FavSports;