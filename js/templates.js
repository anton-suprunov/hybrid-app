this["templates"] = this["templates"] || {};

Handlebars.registerPartial("bg-logo", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"bg-logo\" data-tap-toggle=\"false\" data-role=\"footer\" data-position=\"fixed\"></div>";
},"useData":true}));

Handlebars.registerPartial("footer", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "ui-btn-active ui-state-persist";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div data-role=\"footer\" data-position=\"fixed\" data-id=\"footer\" class=\"footer\" data-theme=\"b\" data-tap-toggle=\"false\">\r\n    <div data-role=\"navbar\">\r\n        <ul>\r\n            <li>\r\n                <a href=\"#\" data-view=\"Scoreboard\" class=\"link scoreboard-trigger footer-btn\r\n                    "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.footerBtn : depth0),"scores",{"name":"ifEq","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n                   data-param-page-id=\"scoreboard-page-"
    + alias3(((helper = (helper = helpers.activeSport || (depth0 != null ? depth0.activeSport : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"activeSport","hash":{},"data":data}) : helper)))
    + "\">Scores</a>\r\n            </li>\r\n            <li class=\"footer-logo-block\">\r\n                <span class=\"ui-btn footer-logo-container\" onclick=\"return false;\">\r\n                    <span class=\"footer-logo\"></span>\r\n                </span>\r\n            </li>\r\n            <li>\r\n                <a href=\"#\" data-view=\"Headlines\" data-param-page-id=\"headlines-page-"
    + alias3(((helper = (helper = helpers.activeSport || (depth0 != null ? depth0.activeSport : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"activeSport","hash":{},"data":data}) : helper)))
    + "\" class=\"link headlines-trigger footer-btn\r\n                    "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.footerBtn : depth0),"news",{"name":"ifEq","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">News</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>";
},"useData":true}));

Handlebars.registerPartial("header", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <a href=\"#\" class=\"icon icon-sport-fav "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isFavourite : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n                icon-header icon-header-right\"></a>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "icon-sport-fav-active";
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials['subtabs-headlines'],depth0,{"name":"subtabs-headlines","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials['subtabs-schedule'],depth0,{"name":"subtabs-schedule","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div data-role=\"header\" data-theme=\"b\" data-position=\"fixed\" data-tap-toggle=\"false\" class=\"header\" data-id=\""
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "-header\">\r\n\r\n    <h1>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n\r\n    <div>\r\n        <a href=\"#\" class=\"icon icon-list icon-header icon-header-left\"></a>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.headerSportFav : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.videoTab : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.subTabs : depth0),"schedule",{"name":"ifEq","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("message", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<ul data-role=\"listview\" class=\"message-list\">\r\n    <li data-role=\"list-divider\">"
    + this.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</li>\r\n</ul>";
},"useData":true}));

Handlebars.registerPartial("navigation-sport", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class=\"nav-item nav-sport "
    + alias3(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"className","hash":{},"data":data}) : helper)))
    + "\" data-sport=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-icon=\"false\">\r\n    <a href=\"#\" class=\"ui-btn nav-btn sport-fav\" data-sport=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</a>\r\n    <div><a href=\"#\" class=\"icon icon-sport-fav icon-sport-fav-sport-list "
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias1).call(depth0,(depth0 != null ? depth0.favSports : depth0),(data && data.index),{"name":"inArray","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n        data-sport=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-active-class=\"icon-sport-fav-active\"></a></div>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "icon-sport-fav-active";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <li class=\"nav-item nav-sport "
    + alias3(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"className","hash":{},"data":data}) : helper)))
    + "\" data-sport=\""
    + alias3((helpers.getSportPos || (depth0 && depth0.getSportPos) || alias1).call(depth0,depth0,(data && data.index),{"name":"getSportPos","hash":{},"data":data}))
    + "\">\r\n        <a href=\"#\" data-param-sport=\""
    + alias3((helpers.getSportPos || (depth0 && depth0.getSportPos) || alias1).call(depth0,depth0,(data && data.index),{"name":"getSportPos","hash":{},"data":data}))
    + "\"\r\n            class=\"ui-btn nav-btn link nav-sport-trigger "
    + ((stack1 = (helpers.isActiveNavSport || (depth0 && depth0.isActiveNavSport) || alias1).call(depth0,depth0,(data && data.index),{"name":"isActiveNavSport","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n            title=\""
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" "
    + ((stack1 = (helpers.isActiveNavSport || (depth0 && depth0.isActiveNavSport) || alias1).call(depth0,depth0,(data && data.index),{"name":"isActiveNavSport","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n            data-view=\""
    + alias3(((helper = (helper = helpers.parentViewName || (depth0 != null ? depth0.parentViewName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentViewName","hash":{},"data":data}) : helper)))
    + "\"\r\n            data-param-page-id=\""
    + alias3((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.parentViewName : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "-page-"
    + alias3((helpers.getSportPos || (depth0 && depth0.getSportPos) || alias1).call(depth0,depth0,(data && data.index),{"name":"getSportPos","hash":{},"data":data}))
    + "\">\r\n        "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n    </a>\r\n";
},"5":function(depth0,helpers,partials,data) {
    return "ui-btn-active";
},"7":function(depth0,helpers,partials,data) {
    return "data-active=\"true\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showFavourite : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</li>";
},"useData":true}));

Handlebars.registerPartial("subtabs-headlines", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div data-role=\"navbar\" class=\"headlines-subtabs header-subtabs\" data-theme=\"b\">\r\n    <ul>\r\n        <li><a href=\"#\" data-type=\"headlines\" class=\"type-trigger ui-btn-active ui-state-persist\">Headlines</a></li>\r\n        <li><a href=\"#\" data-type=\"videos\" class=\"type-trigger\">Video</a></li>\r\n    </ul>\r\n</div>";
},"useData":true}));

Handlebars.registerPartial("subtabs-schedule", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "            <li><a href=\"#\" data-type=\"standings\" class=\"type-trigger\">Standings</a></li>\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "            <li><a href=\"#\" data-type=\"schedule\" class=\"type-trigger\">Schedule</a></li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div data-role=\"navbar\" class=\"schedule-subtabs header-subtabs\" data-theme=\"b\">\r\n    <ul>\r\n        <li><a href=\"#\" data-type=\"scoreboard\" class=\"type-trigger ui-btn-active ui-state-persist\">Scoreboard</a></li>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showStandings : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>";
},"useData":true}));

this["templates"]["broadcast-page"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "\r\n        <h3 class=\"ui-bar ui-bar-a ui-corner-all\">\r\n            Stream is not available at the moment, please try again later.\r\n        </h3>\r\n\r\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.streamIsActive : depth0),true,{"name":"ifEq","hash":{},"fn":this.program(4, data, 0),"inverse":this.program(9, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "\r\n            <div class=\"broadcast-container\">\r\n                <div class=\"broadcast-player\" id=\"broadcast-player-"
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Loading the player...</div>\r\n                <div class=\"broadcast-player-message\"></div>\r\n            </div>\r\n\r\n            <div class=\"broadcast-info\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.pageTitle : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.pageLeadin : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n\r\n";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "                <h3 class=\"broadcast-title\">Now Watching: "
    + this.escapeExpression(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "</h3>\r\n";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return "                    <p class=\"broadcast-leadin\">"
    + this.escapeExpression(((helper = (helper = helpers.pageLeadin || (depth0 != null ? depth0.pageLeadin : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"pageLeadin","hash":{},"data":data}) : helper)))
    + "</p>\r\n";
},"9":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "\r\n            <h3 class=\"ui-bar ui-bar-a ui-corner-all\">\r\n                "
    + this.escapeExpression(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"pageTitle","hash":{},"data":data}) : helper)))
    + " is offline. If your event is about to begin please stand by.\r\n            </h3>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.pageLeadin : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"10":function(depth0,helpers,partials,data) {
    var helper;

  return "                <div class=\"broadcast-info\">\r\n                    <p class=\"broadcast-leadin\">"
    + this.escapeExpression(((helper = (helper = helpers.pageLeadin || (depth0 != null ? depth0.pageLeadin : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"pageLeadin","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"broadcast\">\r\n\r\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.streamIsActive : depth0),undefined,{"name":"ifEq","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["templates"]["event-tabs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,depth0,{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <li>\r\n            "
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\r\n        </li>\r\n";
},"4":function(depth0,helpers,partials,data) {
    return "        <li></li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div data-role=\"navbar\" class=\"single-event-dates header-subtabs\">\r\n    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>";
},"useData":true});

this["templates"]["first-page"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div data-role=\"header\" data-theme=\"b\" data-position=\"fixed\" data-tap-toggle=\"false\" class=\"header\" data-id=\""
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "-header\">\r\n    <h1>"
    + alias3(((helper = (helper = helpers.appName || (depth0 != null ? depth0.appName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"appName","hash":{},"data":data}) : helper)))
    + "</h1>\r\n</div>\r\n    <div data-role=\"content\">\r\n        <p class=\"first-page__message\">"
    + alias3(((helper = (helper = helpers.appName || (depth0 != null ? depth0.appName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"appName","hash":{},"data":data}) : helper)))
    + " requires connection to Internet.</p>\r\n    </div>\r\n</div>";
},"useData":true});

this["templates"]["main-page"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "ptr-content";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div data-role=\"page\" id=\""
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" data-ga-title=\""
    + alias3(((helper = (helper = helpers.gaTitle || (depth0 != null ? depth0.gaTitle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"gaTitle","hash":{},"data":data}) : helper)))
    + "\" data-page-url=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias3(((helper = (helper = helpers.pageClass || (depth0 != null ? depth0.pageClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageClass","hash":{},"data":data}) : helper)))
    + "\"\r\n     data-url=\"#"
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" data-has-panel=\"true\">\r\n\r\n    <div data-role=\"panel\" data-display=\"push\" data-theme=\"b\"></div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.header,depth0,{"name":"header","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n    <div class=\"ui-panel-wrapper "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.refreshable : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n        <div data-role=\"content\">\r\n            <div class=\"page-body\">"
    + ((stack1 = ((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"page","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n        </div>\r\n    </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.footer,depth0,{"name":"footer","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});

this["templates"]["more-navbar"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class=\"nav-item\">\r\n    <a href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"ui-btn nav-btn "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.external : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\r\n</li>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return " system-browser-link ";
},"4":function(depth0,helpers,partials,data) {
    return " external-link ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"nav-divider ui-bar-inherit\" data-role=\"list-divider\">Links</li>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["templates"]["navigation"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "nav-with-sponsor";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "            <li class=\"nav-sponsor\">\r\n                <div class=\"nav-sponsor-container\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.sponsorLogoURL : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </li>\r\n";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "                        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.sponsorLogoURL || (depth0 != null ? depth0.sponsorLogoURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"sponsorLogoURL","hash":{},"data":data}) : helper)))
    + "\" class=\"nav-sponsor-link\" rel=\"external\"></a>\r\n";
},"6":function(depth0,helpers,partials,data) {
    return "ui-btn-active ui-state-persist";
},"8":function(depth0,helpers,partials,data) {
    return "data-active=\"true\"";
},"10":function(depth0,helpers,partials,data) {
    return "ui-btn-active";
},"12":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "            "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.allSports : stack1),true,{"name":"ifEq","hash":{},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.program(15, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"13":function(depth0,helpers,partials,data) {
    return "";
},"15":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\n"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || helpers.helperMissing).call(depth0,(depths[2] != null ? depths[2].favSports : depths[2]),(data && data.index),{"name":"inArray","hash":{},"fn":this.program(16, data, 0, blockParams, depths),"inverse":this.program(18, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"16":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = this.invokePartial(partials['navigation-sport'],depth0,{"name":"navigation-sport","hash":{"parentViewName":(depths[3] != null ? depths[3].parentViewName : depths[3])},"data":data,"indent":"                ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"18":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = this.invokePartial(partials['navigation-sport'],depth0,{"name":"navigation-sport","hash":{"parentViewName":(depths[3] != null ? depths[3].parentViewName : depths[3]),"className":"hidden"},"data":data,"indent":"                ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"20":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.groupedSports : depth0),{"name":"each","hash":{},"fn":this.program(21, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"21":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <li class=\"nav-divider nav-divider_link\" data-role=\"list-divider\">\r\n                    <a href=\"#\" class=\"sub-panel-trigger nav-btn nav-btn_divider ui-icon-carat-r ui-btn-icon-right\"\r\n                       data-target=\"sub-panel-sports-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
    + "</a>\r\n                </li>\r\n";
},"23":function(depth0,helpers,partials,data) {
    return "                <li class=\"nav-divider nav-divider_link\" data-role=\"list-divider\">\r\n                    <a href=\"#\" class=\"sub-panel-trigger nav-btn nav-btn_divider ui-icon-carat-r ui-btn-icon-right\"\r\n                       data-target=\"sub-panel-sports\">All Sports</a>\r\n                </li>\r\n";
},"25":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.groupedSports : depth0),{"name":"each","hash":{},"fn":this.program(26, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"26":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <div class=\"ui-sub-panel sub-panel\" data-id=\"sub-panel-sports-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n                <ul class=\"nav-list nav-list_nested\" data-role=\"listview\" data-list-type=\"panel\">\r\n                    <li class=\"sub-panel-close-wrapper nav-header\">\r\n                        <a href=\"#\" class=\"ui-btn ui-btn-icon-left ui-icon-carat-l sub-panel-close\">\r\n                            "
    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
    + "\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n\r\n                <div class=\"nav-iscroll-wrapper\">\r\n                    <ul class=\"nav-list nav-list_nested\" data-role=\"listview\" data-list-type=\"panel\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sports : depth0),{"name":"each","hash":{},"fn":this.program(27, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\r\n                </div>\r\n            </div>\r\n";
},"27":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                        "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.allSports : stack1),true,{"name":"ifEq","hash":{},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.program(28, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"28":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\n"
    + ((stack1 = this.invokePartial(partials['navigation-sport'],depth0,{"name":"navigation-sport","hash":{"parentViewName":(depths[4] != null ? depths[4].parentViewName : depths[4]),"showFavourite":false},"data":data,"indent":"                            ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"30":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "        <div class=\"ui-sub-panel sub-panel\" data-id=\"sub-panel-sports\">\r\n            <ul class=\"nav-list nav-list_nested\" data-role=\"listview\" data-list-type=\"panel\">\r\n                <li class=\"sub-panel-close-wrapper nav-header\">\r\n                    <a href=\"#\" class=\"ui-btn ui-btn-icon-left ui-icon-carat-l sub-panel-close\">\r\n                        All Sports\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n            <div class=\"nav-iscroll-wrapper\">\r\n                <ul class=\"nav-list nav-list_nested\" data-role=\"listview\" data-list-type=\"panel\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sports : depth0),{"name":"each","hash":{},"fn":this.program(31, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                </ul>\r\n            </div>\r\n        </div>\r\n";
},"31":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                    "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.allSports : stack1),true,{"name":"ifEq","hash":{},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.program(32, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"32":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\n"
    + ((stack1 = this.invokePartial(partials['navigation-sport'],depth0,{"name":"navigation-sport","hash":{"parentViewName":(depths[2] != null ? depths[2].parentViewName : depths[2]),"showFavourite":false},"data":data,"indent":"                        ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"34":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                    "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.allSports : stack1),true,{"name":"ifEq","hash":{},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.program(35, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"35":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\n"
    + ((stack1 = this.invokePartial(partials['navigation-sport'],depth0,{"name":"navigation-sport","hash":{"favSports":(depths[2] != null ? depths[2].favSports : depths[2]),"showFavourite":true},"data":data,"indent":"                        ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<div class=\"nav "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showSponsorLogo : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n    <ul data-role=\"listview\" data-list-type=\"panel\" class=\"nav-list\">\r\n\r\n        <li class=\"nav-header\" data-role=\"list-divider\">\r\n            <span class=\"nav-logo\"></span>\r\n            <a href=\"#\" class=\"link icon icon-flag icon-header\" data-view=\"Notifications\"></a>\r\n            <a href=\"#\" class=\"link icon icon-gear icon-header\" data-view=\"Settings\"></a>\r\n        </li>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showSponsorLogo : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n\r\n    <div class=\"nav-iscroll-wrapper nav-iscroll-wrapper_main\">\r\n        <ul data-role=\"listview\" data-list-type=\"panel\" class=\"nav-list nav-list_main\">\r\n            <li class=\"nav-divider\" data-role=\"list-divider\">"
    + this.escapeExpression(((helper = (helper = helpers.appName || (depth0 != null ? depth0.appName : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"appName","hash":{},"data":data}) : helper)))
    + "</li>\r\n            <li class=\"nav-item\">\r\n                <a href=\"#\" data-param-sport=\"0\" title=\"Event Calendar\" data-param-page-id=\"scoreboard-page-0\"\r\n                   class=\"ui-btn nav-btn link nav-sport-trigger "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.parentViewId : depth0),"scoreboard-page-0",{"name":"ifEq","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n                   "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.parentViewId : depth0),"scoreboard-page-0",{"name":"ifEq","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " data-view=\"Scoreboard\">Event Calendar</span>\r\n                </a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a href=\"#\" data-param-sport=\"0\" title=\"News\" data-param-page-id=\"headlines-page-0\"\r\n                   class=\"ui-btn nav-btn link nav-sport-trigger "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.parentViewId : depth0),"headlines-page-0",{"name":"ifEq","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n                   "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.parentViewId : depth0),"headlines-page-0",{"name":"ifEq","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " data-view=\"Headlines\">News</span>\r\n                </a>\r\n            </li>\r\n\r\n            <li class=\"nav-divider nav-divider_link\" data-role=\"list-divider\">\r\n                <a href=\"#\" class=\"sub-panel-trigger nav-btn nav-btn_divider ui-icon-carat-r ui-btn-icon-right\" data-target=\"sub-panel-favsports\">Favorite sports</a>\r\n            </li>\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sports : depth0),{"name":"each","hash":{},"fn":this.program(12, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.groupedSports : depth0),{"name":"if","hash":{},"fn":this.program(20, data, 0, blockParams, depths),"inverse":this.program(23, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\r\n        </ul>\r\n    </div>\r\n\r\n    <!-- All sports sub panel -->\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.groupedSports : depth0),{"name":"if","hash":{},"fn":this.program(25, data, 0, blockParams, depths),"inverse":this.program(30, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\r\n    <!-- Favorite sports sub panel -->\r\n    <div class=\"ui-sub-panel sub-panel\" data-id=\"sub-panel-favsports\">\r\n        <ul class=\"nav-list nav-list_nested fav-sports-select-list\" data-role=\"listview\" data-list-type=\"panel\">\r\n            <li class=\"sub-panel-close-wrapper nav-header\">\r\n                <a href=\"#\" class=\"ui-btn ui-btn-icon-left ui-icon-carat-l sub-panel-close\">\r\n                    Favorite Sports\r\n                </a>\r\n            </li>\r\n        </ul>\r\n\r\n        <div class=\"nav-iscroll-wrapper\">\r\n            <ul class=\"nav-list nav-list_nested fav-sports-select-list\" data-role=\"listview\" data-list-type=\"panel\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sports : depth0),{"name":"each","hash":{},"fn":this.program(34, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n        </div>\r\n    </div> <!-- favorite sports--->\r\n\r\n</div>";
},"usePartial":true,"useData":true,"useDepths":true});

this["templates"]["notifications-page"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "    <li class=\"clearfix\">\r\n        <label for=\"notification-sport-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.ifExceedLength || (depth0 && depth0.ifExceedLength) || alias1).call(depth0,(depth0 != null ? depth0.title : depth0),23,{"name":"ifExceedLength","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n            "
    + ((stack1 = alias4((depth0 != null ? depth0.title : depth0), depth0)) != null ? stack1 : "")
    + "\r\n        </label>\r\n        <div class=\"float-right\">\r\n            <select name=\""
    + alias3(alias4((depth0 != null ? depth0.id : depth0), depth0))
    + "\" id=\"notification-sport-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"sport-slider\" data-role=\"slider\" data-mini=\"true\">\r\n                <option value=\"false\">OFF</option>\r\n                <option value=\"true\">ON</option>\r\n            </select>\r\n        </div>\r\n    </li>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "class=\"form-list-long-label\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul data-role=\"listview\" class=\"form-list\" data-divider-theme=\"c\">\r\n    <li class=\"title\" data-role=\"list-divider\"><h4>You will receive notifications about sports that are \"On\"</h4></li>\r\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.notifications : depth0)) != null ? stack1.lists : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["templates"]["photoswipe-base"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<!-- Root element of PhotoSwipe. Must have class pswp. -->\r\n<div class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" data-role=\"none\">\r\n\r\n    <!-- Background of PhotoSwipe.\r\n         It's a separate element as animating opacity is faster than rgba(). -->\r\n    <div class=\"pswp__bg\"></div>\r\n\r\n    <!-- Slides wrapper with overflow:hidden. -->\r\n    <div class=\"pswp__scroll-wrap\">\r\n\r\n        <!-- Container that holds slides.\r\n            PhotoSwipe keeps only 3 of them in the DOM to save memory.\r\n            Don't modify these 3 pswp__item elements, data is added later on. -->\r\n        <div class=\"pswp__container\">\r\n            <div class=\"pswp__item\"></div>\r\n            <div class=\"pswp__item\"></div>\r\n            <div class=\"pswp__item\"></div>\r\n        </div>\r\n\r\n        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\r\n        <div class=\"pswp__ui pswp__ui--hidden\">\r\n\r\n            <div class=\"pswp__top-bar\">\r\n\r\n                <!--  Controls are self-explanatory. Order can be changed. -->\r\n\r\n                <div class=\"pswp__counter\"></div>\r\n\r\n                <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\r\n\r\n                <button class=\"pswp__button pswp__button--share\" title=\"Share\"></button>\r\n\r\n                <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\r\n\r\n                <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\r\n\r\n                <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\r\n                <!-- element will get class pswp__preloader--active when preloader is running -->\r\n                <div class=\"pswp__preloader\">\r\n                    <div class=\"pswp__preloader__icn\">\r\n                        <div class=\"pswp__preloader__cut\">\r\n                            <div class=\"pswp__preloader__donut\"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\r\n                <div class=\"pswp__share-tooltip\"></div>\r\n            </div>\r\n\r\n            <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">\r\n            </button>\r\n\r\n            <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">\r\n            </button>\r\n\r\n            <div class=\"pswp__caption\">\r\n                <div class=\"pswp__caption__center\"></div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>";
},"useData":true});

this["templates"]["settings"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.ver || (depth0 != null ? depth0.ver : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"ver","hash":{},"data":data}) : helper)));
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.verMinor || (depth0 != null ? depth0.verMinor : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"verMinor","hash":{},"data":data}) : helper)));
},"5":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "                        <a href=\"market://details?id="
    + alias1(((helper = (helper = helpers.packageIdPrefix || (depth0 != null ? depth0.packageIdPrefix : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"packageIdPrefix","hash":{},"data":data}) : helper)))
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.client : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\r\n                           class=\"ui-btn system-browser-link ui-icon-carat-r ui-btn-icon-right\">Rate in the App Store</a>\r\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return "                        <a href=\"itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.client : depth0)) != null ? stack1.itunesId : stack1), depth0))
    + "?ls=1&mt=8\"\r\n                           class=\"ui-btn system-browser-link ui-icon-carat-r ui-btn-icon-right\">Rate in the App Store</a>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "<div class=\"settings-page\">\r\n    <h2 class=\"settings-page-title\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.client : depth0)) != null ? stack1.appName : stack1), depth0))
    + "</h2>\r\n    <p>Version <span id=\"ver-number\">"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.verMinor : depth0),"",{"name":"ifEq","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</span></p>\r\n\r\n    <div>\r\n        <div class=\"ui-bar ui-bar-a\">\r\n            <h3>Options</h3>\r\n        </div>\r\n        <div class=\"ui-body ui-body-a form-list-wrapper\">\r\n            <ul data-role=\"listview\" class=\"form-list form-list_nested form-list_settings\" data-divider-theme=\"c\">\r\n                <li class=\"clearfix\">\r\n                    <label for=\"settings-timezone\">Use local time zone</label>\r\n                    <div class=\"float-right\">\r\n                        <select name=\"useLocalTimeZone\" id=\"settings-timezone\" data-role=\"slider\" data-mini=\"true\" class=\"settings-slider\">\r\n                            <option value=\"false\">OFF</option>\r\n                            <option value=\"true\">ON</option>\r\n                        </select>\r\n                    </div>\r\n                </li>\r\n                <li class=\"clearfix\">\r\n                    <label for=\"settings-scores\">Hide scores</label>\r\n                    <div class=\"float-right\">\r\n                        <select name=\"hideScores\" id=\"settings-scores\" data-role=\"slider\" data-mini=\"true\" class=\"settings-slider\">\r\n                            <option value=\"false\">OFF</option>\r\n                            <option value=\"true\">ON</option>\r\n                        </select>\r\n                    </div>\r\n                </li>\r\n                <li class=\"clearfix\">\r\n                    <label for=\"settings-article-textsize\">Article text size</label>\r\n                    <div class=\"float-right\">\r\n                        <select name=\"articleTextSize\" id=\"settings-article-textsize\" data-mini=\"true\" class=\"settings-select\">\r\n                            <option value=\"1\">Large</option>\r\n                            <option value=\"2\" selected>Medium</option>\r\n                            <option value=\"3\">Small</option>\r\n                        </select>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n    <div>\r\n        <div class=\"ui-bar ui-bar-a\">\r\n            <h3>Feedback</h3>\r\n        </div>\r\n        <div class=\"ui-body ui-body-a form-list-wrapper\">\r\n            <ul data-role=\"listview\" class=\"form-list form-list_nested\" data-divider-theme=\"c\">\r\n                <li>\r\n                    <a href=\"\" data-role=\"button\" target=\"_blank\"\r\n                       class=\"ui-btn external-link ui-icon-carat-r ui-btn-icon-right\">Feedback</a>\r\n                </li>\r\n                <li>\r\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.platform : depth0),"android",{"name":"ifEq","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n    <img src=\"\" class=\"settings-ps-logo\" alt=\"\" style=\"width:250px\" />\r\n\r\n</div>";
},"useData":true});

this["templates"]["sub-page"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "data-transition=\""
    + this.escapeExpression(((helper = (helper = helpers.transition || (depth0 != null ? depth0.transition : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"transition","hash":{},"data":data}) : helper)))
    + "\"";
},"3":function(depth0,helpers,partials,data) {
    return "data-direction=\"reverse\"";
},"5":function(depth0,helpers,partials,data) {
    return "        <div>\r\n            <a href=\"#\" class=\"icon icon-share icon-header icon-header-right\"></a>\r\n        </div>\r\n";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)));
},"9":function(depth0,helpers,partials,data) {
    return "No title";
},"11":function(depth0,helpers,partials,data) {
    return " ptr-content ";
},"13":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.message,depth0,{"name":"message","data":data,"indent":"                ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div data-role=\"page\" data-page-url=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" data-ga-title=\""
    + alias3(((helper = (helper = helpers.gaTitle || (depth0 != null ? depth0.gaTitle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"gaTitle","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\"\r\n     class=\""
    + alias3(((helper = (helper = helpers.pageClass || (depth0 != null ? depth0.pageClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageClass","hash":{},"data":data}) : helper)))
    + " sub-page\">\r\n\r\n    <div data-role=\"header\" data-theme=\"b\" data-position=\"fixed\" data-tap-toggle=\"false\" data-id=\"subpage-header\">\r\n\r\n        <a href=\"#\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.transition : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " class=\"link\" data-param-page-id=\""
    + alias3(((helper = (helper = helpers.parentViewId || (depth0 != null ? depth0.parentViewId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentViewId","hash":{},"data":data}) : helper)))
    + "\"\r\n            "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.transition : depth0),"slide",{"name":"ifEq","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " title=\""
    + alias3(((helper = (helper = helpers.backButtonLabel || (depth0 != null ? depth0.backButtonLabel : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"backButtonLabel","hash":{},"data":data}) : helper)))
    + "\" data-view=\""
    + alias3(((helper = (helper = helpers.parentViewName || (depth0 != null ? depth0.parentViewName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentViewName","hash":{},"data":data}) : helper)))
    + "\">\r\n            "
    + alias3(((helper = (helper = helpers.backButtonLabel || (depth0 != null ? depth0.backButtonLabel : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"backButtonLabel","hash":{},"data":data}) : helper)))
    + "\r\n        </a>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.shareable : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n        <h1>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</h1>\r\n    </div>\r\n\r\n    <div class=\"ui-panel-wrapper "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.refreshable : depth0),{"name":"if","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n        <div data-role=\"content\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n            <div class=\"page-body\">\r\n                "
    + ((stack1 = ((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"page","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>";
},"usePartial":true,"useData":true});

this["templates"]["subtabs"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,depth0,{"name":"if","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "                <li>\r\n                    <a href=\"#\" class=\""
    + this.escapeExpression(this.lambda((depths[2] != null ? depths[2].linkClass : depths[2]), depth0))
    + " "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n                    "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</a>\r\n                </li>\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "ui-btn-active ui-state-persist";
},"5":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return " data-"
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "=\""
    + alias1(this.lambda(depth0, depth0))
    + "\" ";
},"7":function(depth0,helpers,partials,data,blockParams,depths) {
    return "                <li class=\""
    + this.escapeExpression(this.lambda((depths[2] != null ? depths[2].linkClass : depths[2]), depth0))
    + "-empty\"></li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "<div data-role=\"navbar\" class=\""
    + this.escapeExpression(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"className","hash":{},"data":data}) : helper)))
    + " header-subtabs\">\r\n    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>";
},"useData":true,"useDepths":true});

this["templates"]["video-page"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <video controls autoplay preload=\"auto\" width=\"100%\" poster=\""
    + alias3(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\">\r\n            <source src=\""
    + alias3(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" type='video/mp4' />\r\n            Video is not supported.\r\n        </video>\r\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "        <iframe src=\"http://www.youtube.com/embed/"
    + this.escapeExpression(((helper = (helper = helpers.youtubeId || (depth0 != null ? depth0.youtubeId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"youtubeId","hash":{},"data":data}) : helper)))
    + "?html5=1&autoplay=1\" frameborder=\"0\" allowfullscreen></iframe>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"video-container\" data-thumbnail=\""
    + alias3(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias1).call(depth0,(depth0 != null ? depth0.type : depth0),"html5",{"name":"ifEq","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\r\n<h1>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n<p class=\"date\">"
    + alias3(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p class=\"leadin\">"
    + alias3(((helper = (helper = helpers.leadin || (depth0 != null ? depth0.leadin : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"leadin","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});