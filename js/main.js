/**
 * app global dependencies and setup
 * */
var $ = require('jquery'),
    config = require('./config');

require('handlebars');
require('pubsub');
require('jquery.resize');
require('./handlebars-helpers');

var jwplayer = require('jwplayer');
// set jwplayer as global variable to fix the missing license key issue
window.jwplayer = jwplayer;
jwplayer.key = config.jwplayerKey;

$(document).bind("mobileinit", function() {
    $.mobile.hashListeningEnabled = false;
});
require('jquery.mobile');

/**
 * bootstrap with a combination of dom ready and device ready events
 * */
var App = require('./app'),
    domReady = $.Deferred(),
    deviceReady = $.Deferred();

document.addEventListener("deviceready", deviceReady.resolve, true);
$(domReady.resolve);

$.when(deviceReady, domReady)
    .then(function init(deviceReadyEvent, domReadyEvent) {
        App.init();
    });

// expose config object for appium access
if (config.test) {
    window.config = config;
}
