var _ = require('underscore'),
    $ = require('jquery');

var ScrollUpDown = function(element) {
    this.element = $(element);

    _.bindAll(this, 'touchStart', 'touchEnd', 'touchMove');

    this.element.on('touchstart.scrollupdown', this.touchStart);
    //this.element.on('touchmove.scrollupdown', _.throttle(this.touchMove, 30));
    this.element.on('touchmove.scrollupdown', this.touchMove);
    this.element.on('touchend.scrollupdown', this.touchEnd);
    //logger.log('scroll up down enabled');
};

ScrollUpDown.prototype.touchStart = function(e) {
    var data = this.getData(e);

    this.startCoords = this.currentCoords = {
        x : data.pageX,
        y : data.pageY
    };
};

ScrollUpDown.prototype.touchMove = function(e) {
    var data = this.getData(e),
        distance,
        event;

    if (! this.currentCoords) {
        return;
    }

    this.newCoords = {
        x : data.pageX,
        y : data.pageY
    };

    if (this.currentCoords.y === this.newCoords.y) {
        return;
    }

    if (this.currentCoords.y < this.newCoords.y) {
        event = 'scrolldown';
    } else if (this.currentCoords.y > this.newCoords.y) {
        event = 'scrollup';
    }

    distance = this.newCoords.y - this.startCoords.y;

    this.element.trigger(event, [{
        distance : distance
    }]);

    this.currentCoords = this.newCoords;
};

ScrollUpDown.prototype.touchEnd = function (e) {

};

ScrollUpDown.prototype.getData = function(e) {
    return e.originalEvent.touches ? e.originalEvent.touches[ 0 ] : e;
};

module.exports = ScrollUpDown;