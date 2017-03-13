var App = require('../app'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    helpers = require('../helpers'),
    pageMixin = require('../mixins/page.mixin'),
    url = require('../utils/url.service'),
    templates = require('../templates');

var EventPageView = Backbone.View.extend({
    pageType : 'sub',
    events : {},
    name : 'Event',
    hasSubTabs : true,

    initialize : function(options) {
        var self = this;

        this.url = url.mergeParamsIntoURL(url.normalizeURL(options.url, 'schedule'));
        this.templateData = {
            backButtonLabel : 'Scores',
            pageClass : 'event-page',
            refreshable : true,
            gaTitle : 'Event'
        };

        this.on('viewChange', function(viewName) {
            if (viewName === 'Article') {
                this.keepAfterHide = true;
            }
        });
    },

    _pageShow : function() {
        this.keepAfterHide = false;
    },

    /*
    * pass the parent scoreboard id to any sibling event
    * so that back button links back properly
    * */
    _oninitialize : function() {
        if (this.parentView.name === 'Event') {
            this.parentView = this.parentView.parentView;
            this.templateData.parentViewId = this.parentView.id;
        }
    },

    render : function() {
        this.page = this._parse();
    },

    _initUI : function(refreshed) {
        //if (!refreshed) {
        var gaTitle = this.$el.find('.ui-bar p:first-child').map(function() {
            return $(this).text().trim();
        }).toArray().join(' vs. ');

        this.$el.data('gaTitle', gaTitle);

        this._renderTabs();
        this._refreshUI();
        //}
    },

    _parse : function() {
        var html = $(this.data),
            data = $('<div />').append(html);

        data.find('.single-event-wrapper').each(function() {
            if (!$(this).text().trim()) {
                $(this).remove();
            }
        });
        return data.html();
    },

    /**
     * Moves event tabs from remote HTML into jQuery Mobile page header
     * */
    _renderTabs : function() {
        var eventLinks = new Array(3),
            tabs,
            activePassed = false;

        $(this.page).find('.single-event-dates a').each(function(i, e) {
            var link = $(this),
                linkHTML = helpers.outerHTML(link),
                isActive = link.hasClass('event-active');

            if (isActive) {
                activePassed = true;
                eventLinks[1] = linkHTML;
            } else if (activePassed) {
                eventLinks[2] = linkHTML;
            } else {
                eventLinks[i] = linkHTML;
            }
        });
        this.$('.single-event-dates').remove();

        //console.log(eventLinks);

        tabs = templates['event-tabs']({
            links : eventLinks
        });

        this.$el.children('.ui-header').append(tabs);
    }
});

Cocktail.mixin(EventPageView, pageMixin);
module.exports = EventPageView;