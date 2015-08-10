$('.wrap_top').click(function () { // 
	$('html, body').animate({ scrollTop:0 }, 'slow');
	return false;
});

$(document).ready(function() {  
	//add class "highlight" when hover over the row  
	$('.instance_list').hover(function() {               
		$(this).addClass('highlight');  
	}, function() {  
		$(this).removeClass('highlight');  
	});  

});   

/*window.onload = function(){
    
    var all = document.getElementsByTagName("td");
    for (var i=0;i<all.length;i++) {
        all[i].onclick = inputClickHandler;       
    }
};

function inputClickHandler(e){
    var all = document.getElementsByTagName("td");
    for (var i=0;i<all.length;i++) {
        all[i].style.backgroundColor = "white";
    }  
    
    e = e||window.event;
    var tdElm = e.target||e.srcElement;
    if(tdElm.style.backgroundColor == 'rgb(255, 0, 0)'){
        
        tdElm.style.backgroundColor = '#fff';
        
    } else {
        tdElm.style.backgroundColor = '#f00';
    }
}*/
