var App = require('../app'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    templates = require('../templates'),
    pageMixin = require('../mixins/page.mixin');

var VideoPageView = Backbone.View.extend({

    pageType : 'sub',
    template : templates['video-page'],

    templateData : {
        gaTitle : 'Video',
        backButtonLabel : 'News',
        pageClass : 'video-page',
        shareable : true
    },
    events : {},

    render : function() {
        this.page = this.template(this.options);
    },

    _pageHide : function() {
        //this.destroy();
    },

    _getShareDetails : function() {
        return {
            subject : this.options.title,
            message : this.options.leadin
        }
    }
});

Cocktail.mixin(VideoPageView, pageMixin);
module.exports = VideoPageView;