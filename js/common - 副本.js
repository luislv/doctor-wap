//@ 显示错误提示
function showTips(msg){
	return popTips(msg);
}

//@ 显示加载中提示
function showLoading(msg){
	var obj = $(".loading");
	if(msg){
		if($(".loadingtips").length > 0){
			$(".loadingtips").html(msg);
		}else{
			var str = "<div class='loadingtips'>" + msg +"</div>";
			$(".loading").append(str);
		}
		$(".loading").css({"marginTop": obj.height()*-0.5, "marginLeft": obj.width()*-0.5});
	}
	$(".loading").show();
}

//@ 显示加载中提示
function hideLoading(msg){
	$(".loading").hide();
	if($(".loadingtips").length > 0){
		$(".loadingtips").remove();
		$(".loading").css({"marginTop": "-40px", "marginLeft": "-40px"});
	}
}

//@ 显示成功提示
function showSuccess(msg){
	var str = msg ? msg : "操作成功";
	$(".success").find(".success-msg").html(str).end().show();
	$(".loading").hide();
	setTimeout(function(){
		$(".success").hide();
	}, 3000);
}

//@ 显示动作提示
//@ param title 提示标题，默认为空
//@ param msg 提示内容，默认为空
//@ param duration 提示持续时间，默认3秒，若为sync则一直显示
//@ param args 对象数组，有name address events属性，存储按钮字面义和链接
function showPrompt(title, msg, duration, args){
	var title = title ? title : "", msg = msg ? msg : "", duration = duration ? duration : 3000, args;
	var event_0 = args[0].events ? args[0].events : function(){}, event_1 = typeof args[1] != 'undefined' ? args[1].events : function(){};
	function reset(){
		$(".prompt").removeClass("show");
		$(".prompt-box").removeClass("slipin");
		$(".prompt-title, .prompt-msg, .prompt-btn").empty();
		$(".prompt-btn").unbind();
		$(".prompt-btn").removeClass("half");
		$(".prompt-box, .prompt-msg").removeClass("style");
	}
	$(".prompt-title").html(title);
	$(".prompt-msg").html(msg);
	if(args.length > 1){
		$(".prompt-btn").addClass("half");
	}
	if(args.length){
		for(var i = 0; i < args.length; i++){
			var curbtn = $(".prompt-btn").eq(i);
			curbtn.text(args[i].name);
			curbtn.attr("href", args[i].address ? args[i].address : "javascript:void(0);");
			curbtn.one("click", function(){
				var action = $(this).index() ? event_1 : event_0;
				if(typeof action == 'function') action(); 
				reset();
			});
		}
	}
	$(".prompt").addClass("show");
	$(".prompt-box").addClass("slipin");
	$(".prompt-msg").css({"maxHeight": $(window).height()*0.6+"px"});
	$(".prompt-box").css({"top": ($(window).height() - $(".prompt-box").height())/2+"px"});
	if(duration != "sync" && duration != "syncs"){
		setTimeout(function(){
			reset();
		}, duration);
	}else if(duration == "sync"){
		$(".prompt").one("click", function(){
			reset();
		});
	}
}

// textarea默认显示一行，输入超过一行自动加高
(function($){
    $.fn.autoTextarea = function(options) {
        var defaults={
            maxHeight:null,//文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度
            minHeight:$(this).height() //默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示
        };
        var opts = $.extend({},defaults,options);
        return $(this).each(function() {
        $(this).bind("paste cut keydown keyup focus blur",function(){
            var height,style=this.style;
            this.style.height =  opts.minHeight + 'px';
            if (this.scrollHeight > opts.minHeight) {
                if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
                    height = opts.maxHeight;
                    style.overflowY = 'scroll';
                } 
                else {
                    height = this.scrollHeight;
                    style.overflowY = 'hidden';
                }
                style.height = height  + 'px';
            }
        });
    });
};
})(jQuery);