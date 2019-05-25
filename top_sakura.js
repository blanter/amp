$(function(){

var startFlag = false;
var modalFlag = false;
var loadFlag = false;

var setting = {
	//amount: 200, //???
	amount: 100, //???
	minW: 1280
};

if(isTablet){
	setting.amount = 100;
}

var $w = $(window),
	windowW = $w.innerWidth();
	windowH = 1100;

// create the root of the scene graph
var stage;
var stage2;
var stage3;

var container;

var mouseX;
var mouseY;

var preloadImages;


//?????????
//---------------------------------------
var queue = new createjs.LoadQueue();
queue.on("fileload", handleFileload, this);
queue.on("complete", handleComplete, this);
queue.on("error", function(){
	console.log("error");
});

var items = {};
var bitmapItems = [];
//1??????????
function handleFileload(e){
	items[e.item.id] = e.result;
}
//????????????
function handleComplete(){
	loadFlag = true;
	//loading?????
	$('.loading').fadeOut(500);
	start();
}

function start(){
	// loading?????
	// ????????????@??????????i
	if(!startFlag && loadFlag && modalFlag){
		setTimeout(function(){
			init();
		}, 500);
	}
}

var imgPath = 'http://www.saki-project.jp/images/top/';
//????????????
var manifest = [
	{ id: 'sakura1', src: imgPath + 'sakura01.png'},
	{ id: 'sakura2', src: imgPath + 'sakura02.png'},
	{ id: 'sakura3', src: imgPath + 'sakura03.png'},
	{ id: 'sakura4', src: imgPath + 'sakura04.png'},
	{ id: 'sakura5', src: imgPath + 'sakura05.png'},
	{ id: 'sakura6', src: imgPath + 'sakura06.png'},
	{ id: 'sakura7', src: imgPath + 'sakura07.png'},
	{ id: 'sakura8', src: imgPath + 'sakura08.png'},
	{ id: 'sakura_secret', src: imgPath + 'sakura_secret.png'},
	{ id: 'logo', src: imgPath + 'logo.png'},
	{ id: 'mainTitle', src: imgPath + 'mainTitle.png'},
	// { id: 'sakura_bottom', src: imgPath + 'sakura_bottom.png'},
	{ id: 'chara01', src: imgPath + 'chara01.png'},
	{ id: 'chara02', src: imgPath + 'chara02.png'},
	{ id: 'chara03', src: imgPath + 'chara03.png'},
	{ id: 'chara04', src: imgPath + 'chara04.png'},
	{ id: 'chara05', src: imgPath + 'chara05.png'},
	{ id: 'chara06', src: imgPath + 'chara06.png'},
	{ id: 'twinkle', src: imgPath + 'twinkle.png'}
];
//????r??????
queue.loadManifest(manifest);

//sprites
//---------------------------------
var sprites_sakura = [],
	s_speedY = [], // ????????????
	s_speedX = [], // ????????????
	s_rotate = [],
	s_shakeW = [], //??l??
	s_shakeT = [], //??l???????
	sprites_karuta = [],
	k_speed = [],
	sprites_wood = [],
	sprites_other = [],
	w_speed = [5000],
	sprites_chara = [],
	count = 0, //??????
	w_count = 0, //????
	w_acc = 0.02, //??????
	w_speed = 0; //??????????

// PIXI.loader
// 	.add('sakura01', 'http://www.saki-project.jp/images/s2_top/sakura01.png')
// 	.add('sakura02', 'http://www.saki-project.jp/images/s2_top/sakura02.png')
// 	.add('sakura03', 'http://www.saki-project.jp/images/s2_top/sakura03.png')
// 	.add('sakura04', 'http://www.saki-project.jp/images/s2_top/sakura04.png')
// 	.add('sakura05', 'http://www.saki-project.jp/images/s2_top/sakura05.png')
// 	.add('sakura06', 'http://www.saki-project.jp/images/s2_top/sakura06.png')
// 	.add('sakura07', 'http://www.saki-project.jp/images/s2_top/sakura07.png')
// 	.add('sakura08', 'http://www.saki-project.jp/images/s2_top/sakura08.png')
// 	.load(function(loader,resources){
// 		init(loader, resources);
// 	});


function init(){

	startFlag = true;

	//????????
	stage = new createjs.Stage("myCanvas1");
	//?????????????
	stage2 = new createjs.Stage("myCanvas2");
	stage2.canvas.width = setting.minW;
	stage2.canvas.height = windowH;

	//????????m??
	stage3 = new createjs.Stage("myCanvas3");

	//?????
	stage2_sakura = new createjs.Container();
	stage2_chara = new createjs.Container();

	stage2.addChild(stage2_sakura);
	stage2.addChild(stage2_chara);


	//?????
	for (var i = 0; i < setting.amount ; i++) {

		//sprite????
		var sakura;
		var SECRET_PRO = 1000; //??????1??°????

		// ???????????
		var a = Math.floor(Math.random()*SECRET_PRO) +1;
		if(a === SECRET_PRO){
			var sakura = new createjs.Bitmap(items['sakura_secret']);
		}else{
			var sakuraNum = Math.floor(Math.random()*8) +1;
			var sakura = new createjs.Bitmap(items['sakura' + sakuraNum]);
		}
		sakura.x = Math.random() * windowW;
		sakura.y = Math.random() * -600 -40;
		sakura.regX = sakura.getBounds().width / 2;
		sakura.regY = sakura.getBounds().height / 2;

		var baseParam = Math.random();
		if(baseParam > 0.95){
			baseParam = 1;
		}else if(baseParam <= 0.95 && baseParam >= 0.6){
			baseParam -= 0.3;
		}

		var scale = (baseParam*15 + 4) / 10;
		// var scale = (baseParam*4 + 0.1);
		sakura.scaleX = sakura.scaleY = scale;

		//???????????
		var speedY = baseParam*4 + 0.5;
		var speedX = baseParam*2 + 0.5;

		//????????
		var rotate = Math.random()*0.5 + 1;

		//??l????
		var shakeW = Math.random()*0.5 + 0.2;
		var shakeT = Math.random()*20 + 20;

		// ????@
		if(baseParam > 0.3){
			var filterParam = baseParam * 8;
			var blurFilter = new createjs.BlurFilter(filterParam, filterParam, 0);
			sakura.filters = [blurFilter];
			var filterBounds = blurFilter.getBounds();
			var sakuraBounds = sakura.getBounds();
			sakura.cache(filterBounds.x, filterBounds.y, sakuraBounds.width + filterBounds.width, sakuraBounds.height + filterBounds.height);
		}


		sprites_sakura.push(sakura);
		s_speedY.push(speedY);
		s_speedX.push(speedX);
		s_rotate.push(rotate);
		s_shakeW.push(shakeW);
		s_shakeT.push(shakeT);

		// sakura.compositeOperation = "multiply";

		if(baseParam > 0.4 || a === SECRET_PRO){
			stage.addChild(sakura);

		}else{
			stage3.addChild(sakura);
		}
	};




	//????????????
	// setBitmap({
	// 	id: String,
	// 	container: object,
	// 	rx: String(center/left/right),
	// 	ry: String(center/top/bottom),
	// 	posH: String(center/left/right),
	// 	posV: String(center/top/bottom),
	// 	x,
	// 	y,
	// 	pushArray: Array,
	// 	op: number
	// });

	// ????
	var logo = setBitmap({
		id: 'logo',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'center',
		posV: 'bottom',
		x: 0,
		y: -20,
		pushArray: sprites_other,
		op: 1,
		zIndex: 1
	});


	var chara01 = setBitmap({
		id: 'chara01',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'center',
		posV: 'bottom',
		x: 0,
		y: -15,
		pushArray: sprites_chara,
		op: 0,
		zIndex: 1
	});

	var chara02 = setBitmap({
		id: 'chara02',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'right',
		posV: 'bottom',
		x: -230,
		y: -260,
		pushArray: sprites_chara,
		op: 0,
		zIndex: 1
	});

	var chara03 = setBitmap({
		id: 'chara03',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'left',
		posV: 'bottom',
		x: 300,
		y: -210,
		pushArray: sprites_chara,
		op: 0,
		zIndex: 1
	});

	var chara04 = setBitmap({
		id: 'chara04',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'center',
		posV: 'top',
		x: 40,
		y: 195,
		pushArray: sprites_chara,
		op: 0,
		zIndex: 1
	});

	var chara06 = setBitmap({
		id: 'chara06',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'center',
		posV: 'top',
		x: 50,
		y: 110,
		pushArray: sprites_chara,
		op: 0,
		zIndex: 1
	});

	var chara05 = setBitmap({
		id: 'chara05',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'center',
		posV: 'top',
		x: 15,
		y: 110,
		pushArray: sprites_chara,
		op: 0,
		zIndex: 1
	});

	// ???????
	var mainTitle = setBitmap({
		id: 'mainTitle',
		container: stage2,
		rx: 'center',
		ry: 'center',
		posH: 'center',
		posV: 'top',
		x: 0,
		y: 60,
		pushArray: sprites_other,
		op: 1,
		zIndex: 1
	});

	// ????????
	// var sakura_bottom = setBitmap({
	// 	id: 'sakura_bottom',
	// 	container: stage2,
	// 	rx: 'center',
	// 	ry: 'center',
	// 	posH: 'left',
	// 	posV: 'bottom',
	// 	x: 214,
	// 	y: -143,
	// 	pushArray: sprites_other,
	// 	op: 1,
	// 	zIndex: 1
	// });





	// ????
	createjs.Tween.get(logo, { override: true})
		.to({ y: logo.y + 100, alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(2400)
		.to({ y: logo.y, alpha: 1, scaleX: 1, scaleY: 1}, 1000, createjs.Ease.circOut);


	// chara01
	createjs.Tween.get(chara01, { override: true})
		.to({ y: chara01.y + 50, alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(0)
		.to({ y: chara01.y, alpha: 1, scaleX: 1, scaleY: 1}, 1500, createjs.Ease.circOut);

	// chara02
	createjs.Tween.get(chara02, { override: true})
		.to({ y: chara02.y + 50, alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(400)
		.to({ y: chara02.y, alpha: 1, scaleX: 1, scaleY: 1}, 1500, createjs.Ease.circOut);

	// chara03
	createjs.Tween.get(chara03, { override: true})
		.to({ y: chara03.y + 60, alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(800)
		.to({ y: chara03.y, alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut);

	// chara04
	createjs.Tween.get(chara04, { override: true})
		.to({ y: chara04.y + 60, alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(1200)
		.to({ y: chara04.y, alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut);

	// chara05
	createjs.Tween.get(chara05, { override: true})
		.to({ y: chara05.y - 60, alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(2000)
		.to({ y: chara05.y, alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut);

	// chara06
	createjs.Tween.get(chara06, { override: true})
		.to({ y: chara06.y, alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(2600)
		.to({ y: chara06.y, alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut);

	// ?????????????
	createjs.Tween.get(mainTitle, { override: true})
		.to({ alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(3000)
		.to({ alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut)
		.call(function(){
			//????????
			twinkle();
		});
	//
	// // ????????
	// createjs.Tween.get(sakura_bottom, { override: true})
	// 	.to({ y: sakura_bottom.y, alpha: 0, scaleX: 1, scaleY: 1}, 0)
	// 	.wait(0)
	// 	.to({ y: sakura_bottom.y, alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut);
	//


	// ???????????
	setNav();


	changeWindowSize();

	//????G????????????
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", handleTick);
}


// ????G????????
// -------------------------------------------
function animate() {

	// ??
	for(var i = 0; i< setting.amount; i++){
		//??????????
		sprites_sakura[i].y += s_speedY[i];
		if(sprites_sakura[i].y > windowH + 40){
			sprites_sakura[i].y = -40;
			sprites_sakura[i].x = Math.random() * windowW;
		}

		//????
		sprites_sakura[i].rotation += s_rotate[i];

		//??l
		sprites_sakura[i].x += s_speedX[i] + Math.cos(count / s_shakeT[i]) * s_shakeW[i];
		if(sprites_sakura[i].x > windowW){
			sprites_sakura[i].x = -40;
		}

		//??
		if(count === 500 ||  (count > 2000 && count%2000 === 0) && w_count === 0){
			w_count = 1;
		}
		if(w_count > 0){
			sprites_sakura[i].x += w_speed;
		}
	}



	// ??
	if(w_count > 0){
		w_count++;

		if (w_count <= 400){
			w_speed += w_acc;
		}

		if(w_count > 700){
			w_speed -= w_acc;

			if(w_speed < 0){
				w_speed = 0;
				w_count = 0;
			}
		}

	}



	count++;

	stage.update();
	stage2.update();
	stage3.update();
}


//?????????????
function setNav(){

	//???????
	$('.nav ul li a').velocity({translateY: -100, opacity: 0}, 0);

	function moveNav(){
		var delay;
		var count = 0;
		var listNum = $('.nav ul li').length;
		for(var i=0; i < listNum; i++){
			delay = 100 * Math.abs(i-listNum);
			$('.nav ul li').eq(i).find('a')
			.velocity({translateY: 0, opacity: 1}, { duration: 200, delay: delay, easing: 'easeOutBounce', complete: function(){
				count++;
				//????G?????????????
				if(count === listNum){
					$('.nav ul li a')
						.velocity({rotateZ: '-30deg'}, 30, 'linear')
						.velocity({translateX: '30%'}, { delay: 200, duration: 50, complete: function(){
							$('.nav')
								.addClass('is-animated')
								.find('a')
								.removeAttr('style');
						}});
				}
			}});
		}
	}

	setTimeout(function(){
		moveNav();
	}, 2000);

	//comming soon
	// $('.nav ul li a.goods').addClass('CommingSoon');

}

//bitmap??????
// setBitmap({
	// 	id: String,
	// 	container: object,
	// 	rx: String(center/left/right),
	// 	ry: String(center/top/bottom),
	// 	posH: String(center/left/right),
	// 	posV: String(center/top/bottom),
	// 	x: number,
	// 	y: number,
	// 	pushArray: Array
	// });
function setBitmap(o){
	var obj = new createjs.Bitmap(items[o.id]);
	var width = obj.getBounds().width;
	var height = obj.getBounds().height;
	var container = o.container;
	var containerW = container.canvas.width;
	var containerH = container.canvas.height;
	var pushArray = o.pushArray;
	var index = o.zIndex;

	if(o.rx == 'center'){
		obj.regX = width / 2;
	}else if(o.rx == 'right'){
		obj.regX = width;
	}

	if(o.ry == 'center'){
		obj.regY = height / 2;
	}else if(o.ry == 'bottom'){
		obj.regY = height;
	}

	//posH
	if(o.posH == 'center'){
		obj.x = containerW / 2;
		if(o.rx == 'center'){

		}else if(o.rx == 'right'){
			obj.x += width/2;
		}else{
			obj.x -= width/2;
		}
	}

	if(o.posH == 'left'){
		obj.x = 0;
		if(o.rx == 'center'){
			obj.x += width / 2;
		}else if(o.rx == 'right'){
			obj.x += width;
		}else{

		}
	}

	if(o.posH == 'right'){
		obj.x = containerW;
		if(o.rx == 'center'){
			obj.x -= width / 2;
		}else if(o.rx == 'right'){
		}else{
			obj.x -= width;
		}
	}

	//posV
	if(o.posV == 'center'){
		obj.y = containerH / 2;
		if(o.ry == 'center'){

		}else if(o.ry == 'bottom'){
			obj.y += height/2;
		}else{
			obj.y -= height/2;
		}
	}

	if(o.posV == 'bottom'){
		obj.y = containerH;
		if(o.ry == 'center'){
			obj.y -= height / 2;
		}else if(o.ry == 'bottom'){

		}else{
			obj.y -= height;
		}
	}

	if(o.posV == 'top'){
		obj.y = 0;
		if(o.ry == 'center'){
			obj.y += height / 2;
		}else if(o.ry == 'bottom'){
			obj.y += height;
		}else{
		}
	}

	//????????x,y
	if(o.x){
		obj.x += o.x;
	}
	if(o.y){
		obj.y += o.y;
	}

	//alpha
	if(o.op !== null || o.op !== undefined){
		obj.alpha = o.op;
	}

	//z-index
	if(o.zIndex){
		index = o.zIndex;
	}


	container.addChildAt(obj, index);
	pushArray.push(obj);

	return obj;
}


// ????????
function twinkle(){

	function Particle(){
		this.twinkle = new createjs.Bitmap(items['twinkle']);
		var _t = this.twinkle;
		//????????
		_t.x = Math.random() * (1260-20) + 20;
		_t.y = Math.random() * (160-100) +100;
		_t.regX = _t.getBounds().width/2;
		_t.regY = _t.getBounds().height/2;
		stage2.addChild(_t);

		var twinkleScale = Math.random() * (1.0 - 0.3) + 0.3;

		//???????????
		this.createTween(twinkleScale);
	}

	Particle.prototype = {
		//?????????
		createTween: function(twinkleScale){
			var tween = createjs.Tween.get(this.twinkle);
			tween.to({scaleX:twinkleScale, scaleY:twinkleScale, alpha:1}, 300, createjs.Ease.sineOut)
				.to({scaleX:0.5, scaleY:0.5, alpha:0.5}, 600, createjs.Ease.sineIn)
				.call(this.removeTwinkle, [this.twinkle]);
		},
		// ???
		removeTwinkle: function(e){
			stage2.removeChild(e);
		}

	}

	setInterval(function(){
		new Particle();
	}, 50);


}



//????????
function changeWindowSize(){

	windowW = $w.innerWidth();

	// stage, stage3
	stage.canvas.width = stage3.canvas.width = windowW;
	stage.canvas.height = stage3.canvas.height = windowH;

}



//????F??
//----------------------------------------

//????????
var timer;
$w.on('resize', function(){
	clearTimeout( timer );
	timer = setTimeout(function() {
		//???????
		changeWindowSize();
	}, 300 );
});

// init();





function handleTick(){
	animate();
}


// ????????
// ---------------------------------------------------
$.colorbox({
	iframe:true,
	href: 'https://www.youtube.com/embed/Y8xe9_pLP9c?autoplay=1&autohide=1',
	width:1000,
	height: 600,
	open: true,
	className: 'modal03-wrapper',
	onClosed: function(){
		modalFlag = true;
		start();
	}
});



return;

});