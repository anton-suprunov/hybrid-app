var config = require('../config'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    helpers = require('../helpers'),
    pageMixin = require('../mixins/page.mixin'),
    MobileBoxscore = require('./boxscore.plugin');

var BoxscorePageView = Backbone.View.extend({

    pageType : 'sub',
    events : {},

    initialize : function(options) {
        this.templateData = {
            pageClass : 'boxscore-page',
            backButtonLabel : 'Scores',
            gaTitle : 'Box score',
            refreshable : true,
            message : (options.inProgress ? config.messages.updateableBoxscore : ''),
            shareable : true
        };

        this.openedPanels = [];
        this.selectedTab = 0;
        this.boxscoreApi = {};

        if (options.isInProgress) {
            this.refreshable = true;
            this.refreshPeriod = config.timers.boxscoresUpdate;
        }
    },

    _initUI : function() {
        var self = this;

        _.delay(function() {
            self.boxscoreApi = new MobileBoxscore(self.$el);

            if (self.selectedTab && self.selectedTab !== 0) {
                self.boxscoreApi.slide(self.selectedTab, 1);
            }
        }, 400)
    },

    render : function() {
        this.page = this._parse();
    },

    _parse : function() {
        var data,
            html = $(this.data);

        if (html.filter('#wrapper_accordion').length) {
            data = html.filter('#wrapper_accordion, .message-list');

            //apply accordion
            data.find('#live2 .accordion_toggle').each(function(i, e) {
                var set = $(this).add(data.find('#live2 .accordion_content').eq(i));
                if (i === 0) {
                    set.wrapAll('<div data-role="collapsible" data-collapsed="false" data-content-theme="d">');
                } else {
                    set.wrapAll('<div data-role="collapsible" data-content-theme="d">');
                }
            });
            data.find('#live2').attr('data-role', 'collapsible-set');

            helpers.concatImagesSrc(data.find('img'), config.client.website);
            return helpers.outerHTML(data);

        } else {
            data = $('<div />').append(html);
            helpers.concatImagesSrc(data.find('img'), config.client.website);
            return data.html();
        }
    },

    _pageRefresh : function() {
        var self = this;

        _.delay(function() {
            // open hidden panels back
            if (self.openedPanels.length > 0) {
                _.each(self.openedPanels, function(panel) {
                    self.$('.recent_plays')
                        .eq(panel)
                        .prev('.toggle')
                        .tap();
                });
            }
        }, 400);
    },

    _pageBeforeRefresh : function() {
        var self = this;

        this.selectedTab = this.boxscoreApi.getPos();
        this.openedPanels = [];

        this.$('.recent_plays').each(function(i, e) {
            if ($(this).is(':visible')) {
                self.openedPanels.push(i);
            }
        });
    },

    _getShareDetails : function() {
        var teamsNames = this.$('.swipe-screen:first .teams:first .frame div'),
            teamsStr = '';

        teamsNames.each(function(i, e) {
             teamsStr += $(this).text()
                .replace(/(\r\n|\n|\r)/gm,"")
                .trim() + ' ';
        });

        return {
            subject : config.client.name + ' ' + this.options.boxscoreSport + ' ' + teamsStr
        };
    }
});

Cocktail.mixin(BoxscorePageView, pageMixin);
module.exports = BoxscorePageView;