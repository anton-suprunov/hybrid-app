var App = require('../app'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    pageMixin = require('../mixins/page.mixin'),
    staticMixin = require('../mixins/static.mixin'),
    platform = require('../utils/device.service'),
    settings = require('../settings/settings.service'),
    templates = require('../templates');

var SettingsPageView = Backbone.View.extend({

    templateData : {
        addBackButton : true,
        title : 'Settings',
        gaTitle : 'Settings',
        pageId : 'settings-page'
    },
    pageType : 'sub',
    template : templates['settings'],
    events : {
        'change select' : '_selectChange'
    },

    initialize : function() {
        this.templateData.platform = platform.getPlatform();
    },

    _initUI : function() {
        this.$el.find('select').each(function() {
            var select = $(this);
            select.val(settings.getSetting(this.name));
            if (select.hasClass('settings-slider')) {
                select.slider('refresh');
            } else {
                select.selectmenu().selectmenu('refresh');
            }
        });
    },

    _selectChange : function(e) {
        var select = $(e.currentTarget);

        settings.save(select.attr('name'), select.val());
    }
});

Cocktail.mixin(SettingsPageView, staticMixin, pageMixin);
module.exports = SettingsPageView;
