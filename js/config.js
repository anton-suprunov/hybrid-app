var _ = require('underscore');

var config = {
	timers : {
		appUpdate : 3600000, //one hour,
		boxscoresUpdate : 30000,
		request : 60000
	},

	messages : {
		noConnection : ' requires a connection to the internet',
		updateableBoxscore : 'Page will refresh every 30 seconds',
		notificationsFirstLaunch : 'You have not yet signed up for any sport notifications. ' +
		'\n Please select a sport to begin receiving notifications.'
	},

	plugins : {
		childBrowser : {
			showLocationBar: true
		},
		genericPush : {
			androidId : '81921587804' //sender id
		}
	},

	defaultType : {
		'schedule' : 'scoreboard',
		'headlines' : 'headlines'
	},

	ver : '2.3', // templates version
	verMinor : '2.3', // shown on the about page

	notificationsEndPoint : '/action/frontrow/pushlists',

	navbarMore : '/navbar-frontrow',
	typeSchedule : 'scoreboard', //default view for the schedule template

	thumbnailDefault : '/images/setup/thumbnail_default.jpg',

	classes : {
		btnActive : 'ui-btn-active',
		persist : 'ui-state-persist'
	},

	packageIdPrefix : '',

	broadcasts : {
		analyticsEndPoint : '/action/broadcast/analyticsTrackingInfo.json',
		analyticsUpdatePeriod : 60000,
		streamTestPeriod : 10000,
		analyticsLib : 'http://www.google-analytics.com/analytics.js'
	},

	jwplayerKey : "",

	// app will lock in portrait mode till this pixel width
	portraitOrientationLock : 415
};

var clientConfig = require('../client-assets/config.json'),
	env = window.ENV ? window.ENV : {},
	res = {
		client : clientConfig
	};

module.exports = _.extend(res, config, env);
