var Handlebars = require('handlebars'),
    App = require('./app'),
    _ = require('underscore'),
    sports = require('./utils/sports.service');

Handlebars.registerHelper('ifEq', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('ifObjProp', function(object, prop, options) {
    if (object && object[prop]) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('ifExceedLength', function(str, length, options) {
    if(str.length >= length) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('inArray', function(array, value, options) {
    if(_.indexOf(array, value) !== -1) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('isActiveSport', function(sport, options) {
    if (sports.getActiveSport() === sport) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('activeSport', function() {
    return sports.getActiveSport();
});

Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
});

Handlebars.registerHelper('getSportPos', function(sport, index, options) {
    if (sport.i !== undefined) {
        return sport.i;
    } else {
        return index;
    }
});

Handlebars.registerHelper('isActiveNavSport', function(sport, index, options) {
    var activeSport = sports.getActiveSport();

    if (sport.i !== undefined) {
        if (sport.i === activeSport) {
            return options.fn(this);
        }
    } else if (index === activeSport) {
        return options.fn(this);
    }

    return options.inverse(this);
});