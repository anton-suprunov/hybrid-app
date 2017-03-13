var $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    pageMixin = require('../mixins/page.mixin'),
    PhotoSwipe = require('photoswipe'),
    PhotoSwipeUI = require('photoswipe-ui');

var GalleryPageView = Backbone.View.extend({
    name : 'Gallery',
    pageType : 'sub',

    templateData : {
        backButtonLabel : 'Scores',
        pageClass : 'gallery-page',
        gaTitle : 'Gallery',
        shareable : true
    },

    events : {
        'tap .gallery-list a' : '_handleGalleryLink'
    },

    render : function() {
        this.page = this.data;
    },

    _initUI : function() {
        this.pswpRoot = $('.pswp');
        this.gallery = this.$('.gallery-list');
    },

    _getGalleryItems : function() {
        return this.$('.gallery-list li a').map(function(i, el) {
            return {
                src : $(el).attr('href'),
                w : 0,
                h : 0
            };
        });
    },

    _handleGalleryLink : function(e) {
        var pswpElement = $('.pswp')[0],
            gallery,
            link = $(e.currentTarget),
            index = this.gallery
                .children('li:not(.clear)')
                .index(link.parent());

        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI, this._getGalleryItems(), {
            index: index,
            fullscreenEl : false,
            zoomEl : false
        });

        gallery.listen('gettingData', function(index, item) {
            if (item.w < 1 || item.h < 1) {
                var img = new Image();
                img.onload = function() {
                    item.w = this.width;
                    item.h = this.height;
                    gallery.invalidateCurrItems();
                    gallery.updateSize(true);
                };
                img.src = item.src;
            }
        });

        gallery.init();

        // disable download button
        gallery.options.shareButtons.length = 3;

        e.preventDefault();
    },

    _pageHide : function() {
        //this.destroy();
    },

    _getShareDetails : function() {
        return {
            subject : this.$('.mobile-gallery h1').text()
        };
    }
});

Cocktail.mixin(GalleryPageView, pageMixin);
module.exports = GalleryPageView;