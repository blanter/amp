//???????????
var isSP = false,
    isPC = false,
    isTablet = false;

var uaObj = {
	iPhone: navigator.userAgent.indexOf('iPhone') != -1,
	iPod: navigator.userAgent.indexOf('iPod') != -1,
	iPad: navigator.userAgent.indexOf('iPad') != -1,
	Android: navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1,
	WindowsPhone: navigator.userAgent.indexOf('Windows Phone') != -1
};

if(uaObj.iPhone || uaObj.iPod || uaObj.Android || uaObj.WindowsPhone){
	isSP = true;
} else if (uaObj.iPad){
	isTablet = true;
} else {
	isPC = true;
}


var pageTop = function(){
	var speed = 500;
	var target = $('html');
	var position = target.offset().top;
	$('html, body').animate({
		scrollTop: position
	}, speed, 'swing');
	return false;
}




$(function() {

// ??????????????
if(isTablet){
	$('meta[name=viewport]').attr('content', 'width=1280');
}

//??????????
$('a[href^=#]').click(function() {
	var speed = 500; // ?????
	var href = $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	$('html, body').animate({
		scrollTop: position
	}, speed, 'swing');
	return false;
});







});