var App = require('../app'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Cocktail = require('cocktail'),
    _ = require('underscore'),

    pageMixin = require('../mixins/page.mixin'),
    templates = require('../templates'),
    jwplayer = require('jwplayer');

var BroadcastPageView = Backbone.View.extend({

    template : templates['broadcast-page'],

    dataType : 'JSON',
    pageType : 'sub',
    templateData : {
        pageClass : 'broadcast-page',
        title : 'Broadcast',
        gaTitle : 'Broadcast',
        shareable : true
    },

    events : {},

    _init : function() {
        var self = this;

        // initial load and setup of analytics and status json
        $.when(this._loadAnalytics(), this._loadStatus())
            .then(function(analyticsRes, statusRes) {

                if (analyticsRes.length > 0 && statusRes.length > 0 && analyticsRes[1] === 'success'
                    && statusRes[1] === 'success') {

                    self.analyticsData = analyticsRes[0];
                    self.statusData = statusRes[0];

                    self._initAnalytics()
                        .then(function() {
                            self._setAnalyticsDimensions();
                            self._timeoutAnalyticsDimensionsUpdate();

                            self.render();
                            self._initUI();
                            self._resolve();
                        });

                } else {

                    self.render();
                    self._initUI();
                    self._resolve();
                }

                if (!self.data.streamIsActive) {
                    self._timeoutStreamTest();
                }

            }, function() {
                // some request failed - show error page
                self.render();
                self._resolve();
            });
    },

    render : function() {
        this.page = this.template(_.extend({}, this.data, {
            id : this.id
        }));
    },

    _initUI : function() {
        this._initPlayer();
        this._bindAnalyticsEvents();
    },

    _initPlayer : function() {
        if (!this.data.streamIsActive) {
            return;
        }

        this.player = jwplayer('broadcast-player-' + this.id).setup({
            playlist: {
                sources: [{
                    file: this.data.fileM3u8
                }]
            },

            //autoplay : 'true',
            androidhls : true,

            aspectratio : '16:9',
            stretching : 'fill',
            width : "100%",

            abouttext: 'PrestoSports Broadcasting Player',
            aboutlink: 'http://prestosports.com/services/broadcasting/',

            sharing : {
                link : this.data.sharingURL
            }
        });
    },

    _initAnalytics : function() {
        var self = this;

        if (!self.analyticsData.googleAnalyticsTrackingId) {
            return;
        }

        if (window.broadcastingGA) {
            return new $.Deferred().resolve(true);
        }

        // set different name to new analytics object
        window.GoogleAnalyticsObject = 'broadcastingGA';

        // loading and initializing analytics.js in async manner
        return $.getScript(App.conf.broadcasts.analyticsLib)
            .then(function() {

                window.broadcastingGA('create', self.analyticsData.googleAnalyticsTrackingId, 'auto', 'broadcastGenericTracking', {
                    'storage': 'none',
                    'clientId': device.uuid
                });

                // these options are required since cordova runs off file:// protocol
                window.broadcastingGA('broadcastGenericTracking.set', 'checkProtocolTask', null);
                window.broadcastingGA('broadcastGenericTracking.set', 'checkStorageTask', null);

                window.broadcastingGA('broadcastGenericTracking.send', 'pageview');

                window.broadcastingGA(function() {
                    self.gaEnabled = true;
                });
            });
    },

    _setAnalyticsDimensions : function() {
        var self = this,
            dimensions = {};

        if (!self.analyticsData || !self.statusData) {
            return;
        }

        _.chain(self.analyticsData)
            .pick(function(v, k, o) {
                return k.indexOf('dimension') === 0;
            })
            .each(function(v, k) {
                var res;

                k = k.replace('dimension', '');
                k = k.charAt(0).toLowerCase() + k.slice(1);

                if (self.statusData && self.statusData[k]) {
                    res = self.statusData[k];
                    if (_.isString(v) && _.isString(res) && v.length > 0 && res.length > 0) {
                        dimensions[v] = res;
                    }
                }
            });

        if (!_.isEmpty(dimensions)) {
            window.broadcastingGA('broadcastGenericTracking.set', dimensions);
        }
    },

    _loadAnalytics : function() {
        return $.getJSON(App.normalizeURL(App.conf.broadcasts.analyticsEndPoint));
    },

    _loadStatus : function() {
        var url;

        if (!this.options || !this.options.urlBase) {
            return;
        }

        url = App.normalizeURL(this.options.urlBase + '?status');
        return $.getJSON(url);
    },

    // update dimensions per interval with self execute
    _updateAnalyticsDimensions : function() {
        var self = this;

        if (!this.analyticsData) {
            return;
        }

        this._loadStatus()
            .then(function(res) {
                if (!res || _.isEmpty(res)) {
                    return;
                }
                self.statusData = res;
                self._setAnalyticsDimensions();
                self._timeoutAnalyticsDimensionsUpdate();
            });
    },

    _timeoutAnalyticsDimensionsUpdate : function() {
        var self = this;

        _.delay(function() {
            self._updateAnalyticsDimensions();
        }, App.conf.broadcasts.analyticsUpdatePeriod);
    },

    _sendAnalyticsEvent : function(eventType) {
        if (this.gaEnabled) {
            window.broadcastingGA('broadcastGenericTracking.send', 'event', 'PrestoSports Broadcast', eventType, this.data.channelTitle);
        }
    },

    _bindAnalyticsEvents : function() {
        var self = this;

        if (!this.player) {
            return;
        }

        this.player.on('play', function(e) {
            self._sendAnalyticsEvent('Play');
        });

        this.player.on('buffer', function(e) {
            self._sendAnalyticsEvent('Buffer');
        });

        this.player.on('qualityChange', function(e) {
            self._sendAnalyticsEvent('QualityChange');
        });

        this.player.on('visualQuality', function(e) {
            self._sendAnalyticsEvent('QualityChange');
        });

        this.player.on('pause', function(e) {
            self._sendAnalyticsEvent('Pause');
        });

        // this event was commented out in live-streaming.js file
        //this.player.on('complete', function(e) {
        //self._sendAnalyticsEvent('Complete');
        //});

        //this.player.on('setupError', function(event) {});

        this.player.on('mute', function(e) {
            self._sendAnalyticsEvent('Mute');
        });

        this.player.on('error', function(e) {
            self._sendAnalyticsEvent('Error');
        });
    },

    _timeoutStreamTest : function() {
        var self = this;

        _.delay(function() {
            self._testStreamStatus();
        }, App.conf.streamTestPeriod);
    },

    _testStreamStatus : function() {
        var self = this;

        return $.getJSON(this.options.url)
            .then(function(res) {
                self.data = res;

                if (res.streamIsActive) {
                    self._refreshPage();
                    _.defer(function() {
                        self._playStream();
                    });
                } else {
                    self._timeoutStreamTest();
                }
            }, function() {
                // set new timeout in case of error
                self._timeoutStreamTest();
            });
    },

    _playStream : function() {
        this.player && this.player.play();
    },

    _getShareDetails : function() {
        return {
            subject : this.data.pageTitle,
            message : this.data.pageLeadin,
            url : this.data.sharingURL
        };
    }
});

Cocktail.mixin(BroadcastPageView, pageMixin);
module.exports = BroadcastPageView;