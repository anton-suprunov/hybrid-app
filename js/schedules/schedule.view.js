var App = require('../app'),
    helpers = require('../helpers'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),

    pageMixin = require('../mixins/page.mixin'),
    url = require('../utils/url.service'),
    sports = require('../utils/sports.service');

var SchedulePageView = Backbone.View.extend({
    pageType : 'sub',

    events : {},

    initialize : function(options) {
        this.templateData = {
            backButtonLabel : 'Standings',
            pageClass : 'schedule-page',
            //backButtonURL : '#scoreboard-page-' + App.getActiveSport(),
            gaTitle : options.team + '\'s Scoreboard',
            pageId : 'schedule-page-' + sports.getActiveSport() + '-' + helpers.generateTeamName(options.team),
            refreshable : true
        };
        this.url = url.mergeParamsIntoURL(url.normalizeURL(options.url, 'schedule'));
    },

    _initUI : function() {},

    render : function() {
        this.page = this.data;
    }
});

Cocktail.mixin(SchedulePageView, pageMixin);
module.exports = SchedulePageView;