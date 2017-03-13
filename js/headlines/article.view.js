var App = require('../app'),
    config = require('../config'),
    ui = require('../ui'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    helpers = require('../helpers'),
    url = require('../utils/url.service'),
    pageMixin = require('../mixins/page.mixin'),
    siteScripts = require('../utils/site-scripts.service');

var ArticlePageView = Backbone.View.extend({
    pageType : 'sub',
    events : {
        'tap .mobile-article a' : '_handleLinkClick'
    },
    name : 'Article',

    initialize : function(options) {
        this.templateData = {
            backButtonLabel: 'News',
            pageClass: 'article-page',
            gaTitle: 'Article',
            shareable : true
        };

        if (options.backButtonLabel) {
            this.templateData.backButtonLabel = options.backButtonLabel;
        }
    },

    //_oninitialize : function() {},

    render : function() {
        this.page = this._parseArticle();
    },

    _initUI : function() {
        _.delay(function() {
            siteScripts.update();
        }, 300);
    },

    _handleLinkClick : function(e) {
        var link = $(e.currentTarget);

        ui.openExternalLink(link.attr('href'));
        e.preventDefault();
    },

    _parseArticle : function() {
        var data = $('<div />').append(this.data);

        data.find('a').each(function(){
            $(this)
                .attr('href', url.normalizeURL($(this).attr('href')))
                .addClass('external-link');
        });
        helpers.concatImagesSrc(data.find('img'), config.client.website);
        return data.html();
    },

    _getShareDetails : function() {
        var messageEl = this._removeRelatedLinks();

        messageEl.find('.article-date').remove();

        return {
            message : helpers.truncateText(messageEl.text().trim(), 150, true),
            subject : this.$('.article-title').text()
        };
    },

    _removeRelatedLinks : function() {
        var messageEl = this.$('.article-text').clone(),
            linksTypes = ['Box Score', 'Audio', 'Video', 'Results', 'Live Stats'];

        messageEl.find('a').each(function(i, e) {
            var linkText = $(e).text();
            if (linksTypes.indexOf(linkText) !== -1) {
                $(e).remove();
            }
        });

        return messageEl;
    }
});

Cocktail.mixin(ArticlePageView, pageMixin);
module.exports = ArticlePageView;
