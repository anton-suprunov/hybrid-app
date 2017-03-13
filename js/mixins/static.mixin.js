var _ = require('underscore');

var staticMixin = {
    tagName : 'div',
    templateData : {
        pageClass : 'static-page',
        addBackButton : false
    },

    //initialize : function(options) {},

    render : function() {
        if (this.template) {
            this.page = this.template(_.extend({}, this.defaultTemplateData, this.templateData));
        } else {
            //this.page = pageContainer.html();
        }
    }
};

module.exports = staticMixin;