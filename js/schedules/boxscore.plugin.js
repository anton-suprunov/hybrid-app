var $ = require('jquery'),
	Swipe = require('swipe');

var MobileBoxscore = function(el) {

	var self = el,
		boxscoreSwipe,
		boxscoreType,
		wrapper = self.find('#live2'),
		recentToShow = 5;

	if (wrapper.hasClass('bs-stats')) {
		boxscoreType = 'bsb';
		recentToShow = 1;
	}

	// unbind all events
	self.off('.boxscore');

	/* SWIPE */
	if (self.is(':visible')) {
		init();
	} else {
		self.on('pageshow.boxscore', function() {
			init();
		});
	}

	self.on('tap.boxscore', '#swipe-left', function(){
		boxscoreSwipe.prev();
		return false;
	});
	self.on('tap.boxscore', '#swipe-right', function(){
		boxscoreSwipe.next();
		return false;
	});

	function init() {
		boxscoreSwipe = new Swipe(self.find('#swipe-wrapper').get(), {
			callback : function(event, id, panel) {
				self.find('.dot-nav')
					.children('li')
					.removeClass('active')
					.eq(id)
					.addClass('active');
			}
		});
		self.find('.swipe-screen').on('resize', function(event, w, h){
			if (h !== $(this).data('height')) {
				$(this).data('height', h);

				if (boxscoreSwipe.getActiveIndex() === $(this).index()) {
					self.find('#swipe-wrapper').height(h);
				}
			}
		});
	}

	/* reverse plays and remove empty elements */
	function reversePlays() {
		var plays;

		plays = self.find('.recent_plays.reverse > div').map(function(i, e){
			if ($(this).children('*').length === 0) {
				$(this).remove();
				return null
			}
			return this
		}).get().reverse();

		self.find('.recent_plays.reverse > div').remove();
		self.find('.recent_plays.reverse')
			.append(plays)
			.children('div')
			.addClass('hidden')
			.slice(0, recentToShow)
			.removeClass('hidden');
	}
	reversePlays();

	/* switch between teams in team stats */
	self.on('tap.boxscore', '.team_stats #button-1, .team_stats #button-2', function(){
		var container = $(this).parent(),
			id = $(this).attr('id').replace('button-', '');

		container.find('.button').removeClass('active');
		$(this).addClass('active');

		container.find('.table').hide();
		container.find('#table_team_stats_' + id).show();

		return false;
	});

	/* content toggler for team stats */
	self.on('tap.boxscore', '.team_stats .toggle', function(){
		if (! $(this).next('.more:visible').length) {
			$(this).next('.more').show()
				.parent().addClass('active')
		} else {
			$(this).next('.more').hide()
				.parent().removeClass('active')
		}
		return false
	});

	/* content toggler */
	self.on('tap.boxscore', '.recent .toggle', function(){
		var parent = $(this).parents('.recent');

		//console.log(parent, parent.find('.recent_plays:visible').length);

		if (! parent.find('.recent_plays:visible').length) {
			parent
				.find('.recent_plays').show()
				.end()
				.find('.recent_arrow_down').hide()
				.end()
				.find('.recent_arrow_up').show()
				.end()
				.find('#load-more-plays').removeClass('hidden')
		} else {
			parent
				.find('.recent_plays').hide()
				.end()
				.find('.recent_arrow_down').show()
				.end()
				.find('.recent_arrow_up').hide()
				.end()
				.find('#load-more-plays').addClass('hidden');

			/* hide recent plays */
			if (parent.find('#load-more-plays').length) {
				parent.find('.recent_plays:last > div').slice(recentToShow).hide().addClass('hidden');
			}
		}
		return false
	});

	/* load more plays button */
	self.on('tap.boxscore', '#load-more-plays', function(){
		var self = $(this),
			container = self.parents('.recent').find('.recent_plays'),
			elements = container.children('div'),
			index = elements.filter(':visible:last').index();

		elements.slice(index + 1, index + recentToShow + 1).hide().removeClass('hidden').fadeIn(function(){
			if (elements.filter(':animated').length === 1) {
				if (elements.eq(index + recentToShow).length) {
					$('body, html').animate({
						scrollTop : elements.eq(index + recentToShow).offset().top
					}, 500);
				}
				if (! elements.filter(':hidden').length) {
					self.fadeOut();
				}
			}
		});
		return false;
	});

	self.on('expand.boxscore', function(){
		var containers = $('.ui-collapsible-collapsed');
		//auto close
		containers
			.find('.recent .plays').hide()
			.end()
			.find('#load-more-plays').addClass('hidden')
			.end()
			.find('.arrow img')
			.filter(':even').show()
			.end()
			.filter(':odd').hide();

		containers.each(function(){
			if ($(this).find('#load-more-plays').length) {
				$(this).find('.recent_plays:last > div').slice(recentToShow).hide().addClass('hidden');
			}
		})
	});

	/* baseball specific - remove empty periods in the scoring summary */
	if (boxscoreType === 'bsb') {
		wrapper.find('.scoring-summary .play.period').each(function(i, e){
			if ($(this).next().hasClass('period')) {
				$(this).remove();
			}
		});
		/* set innings width in scoring table */
		var widthOfFirstInning = 30,
			innigsNeedsWidth = wrapper.find('.scores-per-inning th').slice(1),
			numberOfInnings = innigsNeedsWidth.length,
			eachInningWidth = Number((100 - widthOfFirstInning) / numberOfInnings)

		innigsNeedsWidth.css('width', eachInningWidth + '%');
	}

	return {
		getPos : function() {
			return boxscoreSwipe.getPos();
		},
		slide : function(index, speed) {
			speed = speed || 0;
			return boxscoreSwipe.slide(index, speed);
		}
	};
};

module.exports = MobileBoxscore;