/* 
* Scroll to the top
*/

$(window).bind("scroll",display);
function display () {
    if($(document).scrollTop()>300) {
        //$("#top").show();
		$("#top").fadeIn(300);
    }else {
        //$("#top").hide();
		$("#top").fadeOut(300);
    }
}


/* 
* Baidu analytics
*/

var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?5b31ffbbdc6cff18727f3adf75a03777";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
	
/* 
* Google analytics
*/
