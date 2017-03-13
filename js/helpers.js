var _ = require('underscore'),
    $ = require('jquery');

var helpers = {

	generatePageId : function(prefix) {
		return _.uniqueId(prefix + '-');
	},

	stripTags : function(input, allowed) {
		allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
			commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
			return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		});
	},
	
	outerHTML : function(el) {
		return el.clone().wrap('<div>').parent().html();
	},
	
	isExternalURL : function(url) {
		return /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(url);
	},
	
	urlize : function(text) {
		var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
		
		return text.replace(url_regexp, function (match) {
			var url = (/^[a-z]+:/i).test(match) ? match : "http://" + match,
				text = match;
			return "<a target=\"_blank\" href=\"" + helpers.escapeHTML(url) + "\">" + helpers.escapeHTML(text) + "</a>";
		});
	},
	
	escapeHTML : function (s) {
		return s.replace(/</g, "&lt;").replace(/>/g, "^&gt;");
	},

	truncateText : function(str, length, useWordBoundary) {
		var isTooLong = str.length > length,
			res = isTooLong ? str.substr(0, length - 1) : str;

		res = (useWordBoundary && isTooLong) ? res.substr(0, res.lastIndexOf(' ')) : res;
		return  isTooLong ? res + '..' : res;
	},

    dataWildcard : function(element, wildcard) {
        var result = {};

        _.each(element.data(), function(v, k) {
            var key;

            if (k.indexOf(wildcard) === 0) {
                key = helpers.firstCharacterToLowerCase(k.replace(wildcard, ''));
                result[key] = v;
            }
        });

        return result;
    },

    firstCharacterToLowerCase : function(str) {
       return str.substr(0, 1).toLowerCase() + str.substr(1);
    },

    isTextTruncated : function(el) {
        return (el.offsetWidth < el.scrollWidth);
    },

    concatImagesSrc : function(images, domain) {
        images.each(function(){
            var src = $(this).attr('src');
            if (! helpers.isExternalURL(src)) {
                $(this).attr('src', domain + src);
            }
        });
    },

	generateTeamName : function(str) {
		return str.replace(/[^a-zA-Z0-9]+/g, '');
	},

	isAbsoluteUrl : function(url) {
		var r = new RegExp('^(?:[a-z]+:)?//', 'i');
		return r.test(url);
	}
};


module.exports = helpers;
