var WebPullToRefresh = (function () {
	'use strict';

	/**
	 * Hold all of the default parameters for the module
	 * @type {object}
	 */	
	var defaults = {
		// ID of the element holding pannable content area
		contentEl: 'content', 

		// ID of the element holding pull to refresh loading area
		ptrEl: 'ptr', 

		// Number of pixels of panning until refresh 
		distanceToRefresh: 70, 

		// Pointer to function that does the loading and returns a promise
		loadingFunction: false,

		// Dragging resistance level
		resistance: 2.5
	};
	
	/**
	 * Easy shortener for handling adding and removing body classes.
	 */
	var bodyClass = document.body.classList;
	
	/**
	 * Initialize pull to refresh, hammer, and bind pan events.
	 * 
	 * @param {object=} params - Setup parameters for pull to refresh
	 */
    WebPullToRefresh = function(params) {
        /**
         * Pan event parameters
         * @type {object}
         */
        this.pan = {
            enabled: false,
            distance: 0,
            startingPositionY: 0
        };

        this.params = params || {};

        _.bindAll(this, '_panStart', '_panEnd', '_panDown', '_panUp');

        /**
         * Hold all of the merged parameter and default module options
         * @type {object}
         */
        this.options = {
            contentEl: params.contentEl || document.getElementById( defaults.contentEl ),
            ptrEl: params.ptrEl || document.getElementById( defaults.ptrEl ),
            distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
            loadingFunction: params.loadingFunction || defaults.loadingFunction,
            resistance: params.resistance || defaults.resistance,
			touchTimeout : 1500
        };

        if ( ! this.options.contentEl || ! this.options.ptrEl ) {
            return;
        }

        new ScrollUpDown(this.options.contentEl);

        $(this.options.contentEl)
            .on('touchstart', this._panStart)
            .on('touchend', this._panEnd)
            .on('scrolldown', this._panDown)
            .on('scrollup', this._panUp);

        /*
        this.options.contentEl.addEventListener('touchstart', this._panStart);
        this.options.contentEl.addEventListener('touchend', this._panEnd);
        this.options.contentEl.addEventListener('scrolldown', this._panDown);
        this.options.contentEl.addEventListener('scrollup', this._panUp);
        */
    };

	WebPullToRefresh.prototype.isTouchInProgress = function() {
		return this.touchTimeout !== undefined;
	};

	WebPullToRefresh.prototype.stop = function() {
		this._panEnd();
	};

	WebPullToRefresh.prototype._resetTouchTimeout = function() {
		this.touchTimeout && clearTimeout(this.touchTimeout);
		this.touchTimeout = setTimeout(this._panEnd, this.options.touchTimeout);
	};

	/**
	 * Determine whether pan events should apply based on scroll position on panstart
	 * 
	 * @param {object} e - Event object
	 */
	WebPullToRefresh.prototype._panStart = function() {
		this.pan.startingPositionY = document.body.scrollTop;

		if ( this.pan.startingPositionY === 0 ) {
            this.pan.enabled = true;
			this._resetTouchTimeout();
			//logger.log('panstart event');
		}
	};

	/**
	 * Handle element on screen movement when the pandown events is firing.
	 * 
	 * @param {object} e - Event object
     * @param {object} data - data object from scrollupdown.js
	 */
    WebPullToRefresh.prototype._panDown = function(e, data) {
		if ( ! this.pan.enabled ) {
			return;
		}

		//e.preventDefault();
        this.pan.distance = data.distance / this.options.resistance;

        //logger.log('down: ' + data.distance + ' ' + pan.distance);

        this._setContentPan();
        this._setBodyClass();
		this._resetTouchTimeout();
	};

	/**
	 * Handle element on screen movement when the pandown events is firing.
	 * 
	 * @param {object} e - Event object
     * @param {object} data - data object from scrollupdown.js
	 */
    WebPullToRefresh.prototype._panUp = function(e, data) {
		if ( ! this.pan.enabled || this.pan.distance === 0 ) {
			return;
		}

		//e.preventDefault();

		if ( this.pan.distance < data.distance / this.options.resistance ) {
            this.pan.distance = 0;
		} else {
            this.pan.distance = data.distance / this.options.resistance;
		}

        //logger.log('up: ' + data.distance + ' ' + pan.distance);

        this._setContentPan();
        this._setBodyClass();
		this._resetTouchTimeout();
	};

	/**
	 * Determine how to animate and position elements when the panend event fires.
	 * 
	 * @param {object} e - Event object
	 */
    WebPullToRefresh.prototype._panEnd = function() {
		if ( ! this.pan.enabled ) {
			return;
		}
		//e.preventDefault();

        //logger.log('panend event');

        this.options.contentEl.style.transform = this.options.contentEl.style.webkitTransform = '';
        this.options.ptrEl.style.transform = this.options.ptrEl.style.webkitTransform = '';

		if ( document.body.classList.contains( 'ptr-refresh' ) ) {
            this._doLoading();
		} else {
            this._doReset();
		}

        this.pan.distance = 0;
        this.pan.enabled = false;
	};

	/**
	 * Set the CSS transform on the content element to move it on the screen.
	 */
	WebPullToRefresh.prototype._setContentPan = function() {
		//logger.log(pan.distance);
		// Use transforms to smoothly animate elements on desktop and mobile devices
		this.options.contentEl.style.transform = this.options.contentEl.style.webkitTransform = 'translate3d( 0, ' + this.pan.distance + 'px, 0 )';
		this.options.ptrEl.style.transform = this.options.ptrEl.style.webkitTransform = 'translate3d( 0, ' + ( this.pan.distance - this.options.ptrEl.offsetHeight ) + 'px, 0 )';
	};

	/**
	 * Set/remove the loading body class to show or hide the loading indicator after pull down.
	 */
	WebPullToRefresh.prototype._setBodyClass = function() {
		if ( this.pan.distance > this.options.distanceToRefresh ) {
			bodyClass.add( 'ptr-refresh' );
		} else {
			bodyClass.remove( 'ptr-refresh' );
		}
	};

	/**
	 * Position content and refresh elements to show that loading is taking place.
	 */
    WebPullToRefresh.prototype._doLoading = function() {
        var self = this;

		bodyClass.add( 'ptr-loading' );

		// If no valid loading function exists, just reset elements
		if ( ! this.options.loadingFunction ) {
			return this._doReset();
		}

		// The loading function should return a promise
		var loadingPromise = this.options.loadingFunction();

		// For UX continuity, make sure we show loading for at least one second before resetting
		setTimeout( function() {
			// Once actual loading is complete, reset pull to refresh
			loadingPromise.then( self._doReset, self._doReset );
		}, 1000 );
	};

	/**
	 * Reset all elements to their starting positions before any paning took place.
	 */
    WebPullToRefresh.prototype._doReset = function() {
		bodyClass.remove( 'ptr-loading' );
		bodyClass.remove( 'ptr-refresh' );
		bodyClass.add( 'ptr-reset' );

		setTimeout(function() {
			bodyClass.remove( 'ptr-reset' );
		}, 250);
	};

	return WebPullToRefresh;
})();