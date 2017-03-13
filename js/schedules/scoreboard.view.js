var App = require('../app'),
    config = require('../config'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    pageMixin = require('../mixins/page.mixin'),
    favSports = require('../schedules/fav-sports.service'),
    sports = require('../utils/sports.service');

var ScoreboardPageView = Backbone.View.extend({

    events : {
        'change .schedule-filter' : '_handleFilterChange'
    },
    refreshable : true,

    initialize : function(options) {
        // legacy linking to client configuration
        this.type = 'schedule';
        this.name = 'Scoreboard';
        this.sport = sports.getActiveSport();

        if (this.sport !== 0) {
            this.hasSubTabs = true;
        }

        this.url = this._getURL();
        this.templateData = {
            gaTitle : 'Scoreboard',
            refreshable : true,
            pageClass : 'schedule-page',
            footerBtn : 'scores',
            pageId : 'scoreboard-page-' + sports.getActiveSport(),
            headerSportFav : sports.getActiveSport() !== 0,
            isFavourite : _.indexOf(favSports.getFavSports(), sports.getActiveSport()) !== -1,
            subTabs : (config.client.sports[sports.getActiveSport()].params &&
            config.client.sports[sports.getActiveSport()].params.allSports) ? false : 'schedule',
            showStandings : (config.client.urlParams && config.client.urlParams.schedule &&
            config.client.urlParams.schedule.conference)
        };
    },

    //_oninitialize : function() {},

    render : function() {
        this.page = this.data;
    },

    //check if scoreboard has in progress events
    _initUI : function() {
        var self = this,
            list = this.$el.find('.schedule-list');

        if (list.children('li[data-in-progress=true]').length > 0) {
            this.refreshPeriod = config.timers.boxscoresUpdate;
            this.autoRefreshTest = function() {
                return !self.$('.type-container[data-type=scoreboard]').hasClass('hidden');
            };
        }
    },

    _handleFilterChange : function(e) {
        var select = $(e.currentTarget);

        var val = select.val() || '',
            events = this.$el.find('.event-expanded, .event-compact');

        if (val.length) {
            events.addClass('event-hidden')
                .filter('[data-sport="' + val + '"]')
                .removeClass('event-hidden');
        } else {
            events.removeClass('event-hidden');
        }
    }
});

Cocktail.mixin(ScoreboardPageView, pageMixin);
module.exports = ScoreboardPageView;