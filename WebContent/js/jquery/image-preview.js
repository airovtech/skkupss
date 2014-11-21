/*
 * Image preview script 
 * powered by jQuery (http://www.jquery.com)
 * 
 * written by Alen Grakalic (http://cssglobe.com)
 * 
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */
 
this.imagePreview = function(){	
	/* CONFIG */
		
		xOffset = 10;
		yOffset = 25;
		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
		
	/* END CONFIG */
	$(".js_image_preview").live(
		{mouseenter: function(e){
			var src = $(this).attr('src');
			if(!src) return;
			this.t = this.title;
			this.title = "";
			var c = (this.t != "") ? "<div style='background-color: #c7c7c7;height:20px;width:100%!important;text-indent:5px;padding-top:5px'>" + this.t + "</div>" : "";
			$("body").append("<div id='image_preview' style='position:absolute; z-index:10001; border: 1px solid #999999; padding:1px'>" + c + "<img src='" 
					+ src + "' style='max-height:600px; max-width:800px'/></div>");
			var imagePreview = $("div#image_preview");
			var top = (e.pageY + yOffset);
			var left = (e.pageX + xOffset);			
			var scrollWidth = $(window).scrollLeft() + window.innerWidth;
			var scrollHeight = $(window).scrollTop() + window.innerHeight;
			if((top +imagePreview.children('img').height() + yOffset) > scrollHeight && top>scrollHeight/2){
				top = e.pageY - imagePreview.children('img').height() - xOffset - yOffset;		
			}			
			if((left+imagePreview.children('img').width()) + xOffset + yOffset > scrollWidth){
				left = scrollWidth - imagePreview.children('img').width() - xOffset - yOffset;		
			}			
			imagePreview.css("top", top + "px").css("left", left + "px").fadeIn("slow");						
	    },
		mouseleave: function(){
			this.title = this.t;	
			$("div#image_preview").remove();
	    }
    });	
	$(".js_image_preview").live('mousemove', function(e){
		var imagePreview = $("div#image_preview");
		var top = (e.pageY + yOffset);
		var left = (e.pageX + xOffset);			
		var scrollWidth = $(window).scrollLeft() + window.innerWidth;
		var scrollHeight = $(window).scrollTop() + window.innerHeight;
		if((top +imagePreview.children('img').height()) + yOffset > scrollHeight && top>scrollHeight/2){
			top = e.pageY - imagePreview.children('img').height() - xOffset - yOffset;		
		}			
		if((left+imagePreview.children('img').width()) + xOffset + yOffset > scrollWidth){
			left = scrollWidth - imagePreview.children('img').width() - xOffset - yOffset;		
		}			
		imagePreview.css("top", top + "px").css("left", left + "px").fadeIn("fast");						
	});			
};


// starting the script on page load
$(document).ready(function(){
	imagePreview();
});