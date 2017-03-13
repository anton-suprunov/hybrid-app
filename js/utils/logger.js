var $ = require('jquery'),
    config = require('../config');

var logger = {
    init : function() {
        if (!config.test) {
            return;
        }

        this.el = $('<div id="logger" />');

        this.el.css({
            position : 'fixed',
            bottom : '63px',
            left : 0,
            right : 0,
            width : '100%',
            height : '100px',
            overflow : 'auto',
            backgroundColor : 'rgba(0, 0, 0, 0.7)',
            zIndex : '1005',
            padding : '5px'
        });
        this.el.appendTo('body');
    },
    log : function(message) {
        if (!this.el) return;
        
        $('<p />').text(message).appendTo(this.el).css({
            color : '#fff',
            'textShadow' : 'none',
            'margin' : 0,
            fontSize : '10px'
        });
        this.el.scrollTop(this.el[0].scrollHeight);
    }
};

module.exports = logger;