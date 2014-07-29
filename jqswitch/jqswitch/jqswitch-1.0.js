(function($){
	$.fn.jqswitch = function(options, key, value){
		
		if(options  == "option" && typeof key == "string" && typeof value == "undefined"){
			//获取值
			var settings = $(this).data("settings");
			if(typeof settings != "object"){
				return null;
			}
			return settings[key];
			
		}else if(options  == "option" && typeof key == "string" && typeof value != "undefined"){
			//设置值
			var settings = $(this).data("settings");
			if(settings == null){
				settings = {};
			}
			settings[key] = value;
			$(this).data("settings", settings);
			updateUI(this, false);
			return this;
		}
		
		if(typeof $(this).data("settings") === "undefined"){
			$(this).data("settings", $.extend({}, {version:"1.0", on: true}, options));
			$("<div/>").addClass("jqswitch-slider").appendTo(this);
			updateUI(this, false);
			
			$(this).addClass("jqswitch").click(function(){
				var settings = $(this).data("settings");
				if(settings.on){
					settings.on = false;
					$(this).data("settings", settings);
				}else{
					settings.on = true;
					$(this).data("settings", settings);
				}
				updateUI(this, true);
				
				if(typeof settings.change == "function"){
					settings.change(settings.on);
				}
			});
		}
		
		return this;
	};
	
	function updateUI(el, anim){
		var settings = $(el).data("settings");
		var slider = $(el).find(".jqswitch-slider");
		if(settings.on){
			if(anim){
				slider.animate({"left":"0"}, 200);
			}else{
				slider.css({"left":"0"});
			}
			
		}else{
			if(anim){
				slider.animate({"left":"-106px"}, 200);
			}else{
				slider.css({"left":"-106px"});
			}
		}
	}
	
}(jQuery));