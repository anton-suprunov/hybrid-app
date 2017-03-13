var config = require('../config'),
    _ = require('underscore');

function Sports() {
    this.activeSport = 0;
}

_.extend(Sports.prototype, {
    getSportBySportCode : function(sportCode) {
        var sport;
        _.each(config.client.sports, function(e, i) {
            if (e.code && e.code === sportCode) {
                sport = i;
            }
        });
        return sport;
    },

    // switches sport by sport code, needed for notifications
    getSportBySportCode : function(sportCode, module) {
        var sportToOpen;

        sportToOpen = this.getSportBySportCode(sportCode);

        if (typeof sportToOpen !== "undefined") {
            this.setActiveSport(sportToOpen);
        }

        return sportToOpen;
    },

    getActiveSport : function() {
        return this.activeSport;
    },

    setActiveSport : function(sport) {
        console.log('changing sport to ' +sport);
        this.activeSport = +sport;
    },

    getActiveSportTitle : function() {
        return config.client.sports[this.activeSport].title;
    },

    getGroupedSports : function() {
        var sports = config.client.sports.slice(0),
            groupedSports = [];

        sports.shift();

        if (!sports[0].category) {
            return false;
        }

        if (!this.groupedSports) {
            this.groupedSports = groupedSports;
        } else {
            return this.groupedSports;
        }

        _.each(sports, function(sport, index) {
            var pos = _.findIndex(groupedSports, function(o) {
                return o.category === sport.category;
            });
            sport.i = index + 1;

            if (pos === -1) {
                groupedSports.push({
                    category : sport.category,
                    sports : [sport]
                });
            } else {
                groupedSports[pos].sports.push(sport);
            }
        });

        _.sortBy(groupedSports, function(o) {
            return o.category;
        });

        return groupedSports;
    }
});

module.exports = new Sports();