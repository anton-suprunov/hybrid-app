var App = require('../app'),
    config = require('../config'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),
    pageMixin = require('../mixins/page.mixin'),
    favSports = require('../schedules/fav-sports.service'),
    sports = require('../utils/sports.service');

var HeadlinesPageView = Backbone.View.extend({

    events : {
        'tap .headlines-subtabs' : '_handleSubTabClick',
        'tap .headlines-page .twitter-li' : '_handleTwitterClick'
    },
    refreshable : true,

    initialize : function() {
        this.name = 'Headlines';
        this.type = 'headlines';
        this.url = this._getURL(this.type);
        this.sport = sports.getActiveSport();

        this.templateData = {
            videoTab : false,
            gaTitle : 'Headlines',
            refreshable : true,
            pageClass : 'headlines-page',
            footerBtn : 'news',
            pageId : 'headlines-page-' + sports.getActiveSport(),
            headerSportFav : sports.getActiveSport() !== 0,
            isFavourite : _.indexOf(favSports.getFavSports(), sports.getActiveSport()) !== -1
        };
    },

    render : function() {
        this.page = this.data;
    },

    _handleSubTabClick : function(e) {
        $(e.currentTarget).find('.main-trigger:first').addClass(config.classes.btnActive);
    },

    _handleTwitterClick : function(e) {
        $(e.currentTarget).removeClass(config.classes.btnActive + ' ui-btn-focus');
    }
});

Cocktail.mixin(HeadlinesPageView, pageMixin);
module.exports = HeadlinesPageView;