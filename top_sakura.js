$(function(){

var startFlag = false;
var modalFlag = false;
var loadFlag = false;

var setting = {
	//amount: 200, //邱乗焚
	amount: 100, //邱乗焚
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


//繝励Μ繝ｭ繝ｼ繝�
//---------------------------------------
var queue = new createjs.LoadQueue();
queue.on("fileload", handleFileload, this);
queue.on("complete", handleComplete, this);
queue.on("error", function(){
	console.log("error");
});

var items = {};
var bitmapItems = [];
//1繝輔ぃ繧､繝ｫ縺斐→
function handleFileload(e){
	items[e.item.id] = e.result;
}
//隱ｭ縺ｿ霎ｼ縺ｿ邨ゆｺ�
function handleComplete(){
	loadFlag = true;
	//loading繧呈ｶ亥悉
	$('.loading').fadeOut(500);
	start();
}

function start(){
	// loading繧呈ｶ亥悉
	// 縺ｾ縺�繧ｹ繧ｿ繝ｼ繝医＠縺ｦ縺�↑縺九▲縺溘ｉ
	if(!startFlag && loadFlag && modalFlag){
		setTimeout(function(){
			init();
		}, 500);
	}
}

var imgPath = 'https://1.bp.blogspot.com/';
//隱ｭ縺ｿ霎ｼ繧逕ｻ蜒�
var manifest = [
	{ id: 'sakura1', src: 'https://1.bp.blogspot.com/-akBAPL1OqbA/XOkVWVue4hI/AAAAAAAABHw/82dD_ce0Dcw6JZ-9NKpKPsI9HOEujpy1ACLcBGAs/s1600/sakura01.png'},
	{ id: 'sakura2', src: 'https://1.bp.blogspot.com/-pXr-V3t_l-M/XOkVWflv5TI/AAAAAAAABH0/dKjCH_eEELcOMSg1Q29VijXr40tyuEfdwCLcBGAs/s1600/sakura02.png'},
	{ id: 'sakura3', src: 'https://1.bp.blogspot.com/-i4ef8unPssU/XOkVWXUwf8I/AAAAAAAABH4/LLU8vLhS6rQx1wx32XXjmW3Sa1vNNGWdwCLcBGAs/s1600/sakura03.png'},
	{ id: 'sakura4', src: 'https://1.bp.blogspot.com/-L_opxMgGRcU/XOkVW4lw90I/AAAAAAAABH8/m60tpFL6xCI2kgDwgTrvPocGZJmj37rqgCLcBGAs/s1600/sakura04.png'},
	{ id: 'sakura5', src: 'https://1.bp.blogspot.com/-krDkG5-GxWg/XOkVXG1t6CI/AAAAAAAABIA/iC6_4djnggoQmQXp_sZ4xGiwndPkdXSugCLcBGAs/s1600/sakura05.png'},
	{ id: 'sakura6', src: 'https://1.bp.blogspot.com/-4yIwYbn9D2A/XOkVXTVue_I/AAAAAAAABIE/dY1KaofunSA5oK44ZspxvunB-QPP4uD8wCLcBGAs/s1600/sakura06.png'},
	{ id: 'sakura7', src: 'https://1.bp.blogspot.com/-F1g7JWi4Ts0/XOkVXiyto9I/AAAAAAAABII/WiXtCxwj7aYPf10MNGb47tQmE8dj-QrdwCLcBGAs/s1600/sakura07.png'},
	{ id: 'sakura8', src: 'https://1.bp.blogspot.com/-XlYc_kk_VTg/XOkVX1j4txI/AAAAAAAABIM/n3XJCq1qLHcVhU-CmbD5iuNMrgsJ5iIvwCLcBGAs/s1600/sakura08.png'},
	{ id: 'sakura_secret', src: 'https://1.bp.blogspot.com/-1ZIICVVEGVk/XOkVZNBBz9I/AAAAAAAABIY/Cyvy5NvaN2krNMWuE21fSFDhPcFyLYNpgCLcBGAs/s1600/sakura_secret.png'},
	{ id: 'logo', src: 'https://1.bp.blogspot.com/-kskDkTX79S0/XOkVVbO4GII/AAAAAAAABHo/2dapCxSCE4sxnrLT--fupNkX6rJAmI1wgCLcBGAs/s1600/logo.png'},
	{ id: 'mainTitle', src: 'https://1.bp.blogspot.com/-XOM_ObeDOnc/XOkVV8lv8PI/AAAAAAAABHs/ItC2BObFYy0vjFHHJJMdwrHESSUgFwRhQCLcBGAs/s1600/mainTitle.png'},
	// { id: 'sakura_bottom', src: imgPath + 'sakura_bottom.png'},
	{ id: 'chara01', src: 'https://1.bp.blogspot.com/-SNK5GzaTPcg/XOkVTv-JXxI/AAAAAAAABHY/QobtpdfOFKQRV2yDttzfkf32tt_zm_JHgCLcBGAs/s1600/chara01.png'},
	{ id: 'chara02', src: 'https://1.bp.blogspot.com/-7R1eIS-9ll8/XOkVTC9ua4I/AAAAAAAABHU/tEaxFb0S4W890IWlCnujW_bHc_TPuRhhACLcBGAs/s1600/chara02.png'},
	{ id: 'chara03', src: 'https://1.bp.blogspot.com/-C9kjP1FDO4g/XOkVS8DEgtI/AAAAAAAABHQ/K-EUet5rH08eTHy1_HvzGy_XKWHDA6l_ACLcBGAs/s1600/chara03.png'},
	{ id: 'chara04', src: 'https://1.bp.blogspot.com/-0Q5r-xL08-A/XOkVUiB2yNI/AAAAAAAABHc/BFLRiowJN04gdbpzew4oi7_vnBLCs4fOQCLcBGAs/s1600/chara04.png'},
	{ id: 'chara05', src: 'https://1.bp.blogspot.com/-jUqvmI1vDf0/XOkVVBCaOSI/AAAAAAAABHk/nzkMjYulo6worIUmvVZpcocpY7oGIStEQCLcBGAs/s1600/chara05.png'},
	{ id: 'chara06', src: 'https://1.bp.blogspot.com/--Izz_AvNzL4/XOkVUxwQfRI/AAAAAAAABHg/OPwuI2M2JNY7VKkpcSNsXWXHLvByqxIkwCLcBGAs/s1600/chara06.png'},
	{ id: 'twinkle', src: 'https://1.bp.blogspot.com/-CD5KZSsugE0/XOkVY-Pv_wI/AAAAAAAABIU/r0WrvlX_RjUKiiM6NkFTzXZmDOrxxnwDwCLcBGAs/s1600/twinkle.png'}
];
//逕ｻ蜒上ｒ繝ｭ繝ｼ繝�
queue.loadManifest(manifest);

//sprites
//---------------------------------
var sprites_sakura = [],
	s_speedY = [], // 邵ｦ譁ｹ蜷代せ繝斐�繝�
	s_speedX = [], // 讓ｪ譁ｹ蜷代せ繝斐�繝�
	s_rotate = [],
	s_shakeW = [], //繧�ｌ蟷�
	s_shakeT = [], //繧�ｌ繧ｹ繝斐�繝�
	sprites_karuta = [],
	k_speed = [],
	sprites_wood = [],
	sprites_other = [],
	w_speed = [5000],
	sprites_chara = [],
	count = 0, //蝗櫁ｻ｢逕ｨ
	w_count = 0, //鬚ｨ逕ｨ
	w_acc = 0.02, //鬚ｨ蜉�騾�
	w_speed = 0; //蛻晄悄繧ｹ繝斐�繝�

// PIXI.loader
// 	.add('sakura01', 'images/s2_top/sakura01.png')
// 	.add('sakura02', 'images/s2_top/sakura02.png')
// 	.add('sakura03', 'images/s2_top/sakura03.png')
// 	.add('sakura04', 'images/s2_top/sakura04.png')
// 	.add('sakura05', 'images/s2_top/sakura05.png')
// 	.add('sakura06', 'images/s2_top/sakura06.png')
// 	.add('sakura07', 'images/s2_top/sakura07.png')
// 	.add('sakura08', 'images/s2_top/sakura08.png')
// 	.load(function(loader,resources){
// 		init(loader, resources);
// 	});


function init(){

	startFlag = true;

	//繧ｵ繧ｯ繝ｩ逕ｨ
	stage = new createjs.Stage("myCanvas1");
	//繧ｭ繝｣繝ｩ繝ｻ閭梧勹逕ｨ
	stage2 = new createjs.Stage("myCanvas2");
	stage2.canvas.width = setting.minW;
	stage2.canvas.height = windowH;

	//繧ｵ繧ｯ繝ｩ蠕後ｍ逕ｨ
	stage3 = new createjs.Stage("myCanvas3");

	//縺輔￥繧�
	stage2_sakura = new createjs.Container();
	stage2_chara = new createjs.Container();

	stage2.addChild(stage2_sakura);
	stage2.addChild(stage2_chara);


	//縺輔￥繧�
	for (var i = 0; i < setting.amount ; i++) {

		//sprite險ｭ螳�
		var sakura;
		var SECRET_PRO = 1000; //菴募倶ｸｭ1蛟九°險ｭ螳�

		// 繧ｷ繝ｼ繧ｯ繝ｬ繝�ヨ
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

		//繧ｹ繝斐�繝芽ｨｭ螳�
		var speedY = baseParam*4 + 0.5;
		var speedX = baseParam*2 + 0.5;

		//蝗櫁ｻ｢險ｭ螳�
		var rotate = Math.random()*0.5 + 1;

		//繧�ｌ險ｭ螳�
		var shakeW = Math.random()*0.5 + 0.2;
		var shakeT = Math.random()*20 + 20;

		// 縺ｼ縺九＠
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




	//繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ
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

	// 繝ｭ繧ｴ
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

	// 繧ｿ繧､繝医Ν
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

	// 譯懶ｼ井ｸ具ｼ�
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





	// 繝ｭ繧ｴ
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

	// 繝｡繧､繝ｳ繧ｿ繧､繝医Ν
	createjs.Tween.get(mainTitle, { override: true})
		.to({ alpha: 0, scaleX: 1, scaleY: 1}, 0)
		.wait(3000)
		.to({ alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut)
		.call(function(){
			//繧ｭ繝ｩ繧ｭ繝ｩ
			twinkle();
		});
	//
	// // 譯懶ｼ井ｸ具ｼ�
	// createjs.Tween.get(sakura_bottom, { override: true})
	// 	.to({ y: sakura_bottom.y, alpha: 0, scaleX: 1, scaleY: 1}, 0)
	// 	.wait(0)
	// 	.to({ y: sakura_bottom.y, alpha: 1, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.circOut);
	//


	// 繝｡繝九Η繝ｼ陦ｨ遉ｺ
	setNav();


	changeWindowSize();

	//繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ髢句ｧ�
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", handleTick);
}


// 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ
// -------------------------------------------
function animate() {

	// 譯�
	for(var i = 0; i< setting.amount; i++){
		//關ｽ荳九せ繝斐�繝�
		sprites_sakura[i].y += s_speedY[i];
		if(sprites_sakura[i].y > windowH + 40){
			sprites_sakura[i].y = -40;
			sprites_sakura[i].x = Math.random() * windowW;
		}

		//蝗櫁ｻ｢
		sprites_sakura[i].rotation += s_rotate[i];

		//繧�ｌ
		sprites_sakura[i].x += s_speedX[i] + Math.cos(count / s_shakeT[i]) * s_shakeW[i];
		if(sprites_sakura[i].x > windowW){
			sprites_sakura[i].x = -40;
		}

		//鬚ｨ
		if(count === 500 ||  (count > 2000 && count%2000 === 0) && w_count === 0){
			w_count = 1;
		}
		if(w_count > 0){
			sprites_sakura[i].x += w_speed;
		}
	}



	// 鬚ｨ
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


//繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ
function setNav(){

	//蛻晄悄險ｭ螳�
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
				//繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ邨ゆｺ�凾
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

//bitmap繧偵そ繝�ヨ
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

	//菴咲ｽｮ隱ｿ謨ｴx,y
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


// 繧ｭ繝ｩ繧ｭ繝ｩ
function twinkle(){

	function Particle(){
		this.twinkle = new createjs.Bitmap(items['twinkle']);
		var _t = this.twinkle;
		//陦ｨ遉ｺ菴咲ｽｮ
		_t.x = Math.random() * (1260-20) + 20;
		_t.y = Math.random() * (160-100) +100;
		_t.regX = _t.getBounds().width/2;
		_t.regY = _t.getBounds().height/2;
		stage2.addChild(_t);

		var twinkleScale = Math.random() * (1.0 - 0.3) + 0.3;

		//縲繝医ぇ繧､繝ｼ繝ｳ
		this.createTween(twinkleScale);
	}

	Particle.prototype = {
		//繝医ぇ繧､繝ｼ繝ｳ
		createTween: function(twinkleScale){
			var tween = createjs.Tween.get(this.twinkle);
			tween.to({scaleX:twinkleScale, scaleY:twinkleScale, alpha:1}, 300, createjs.Ease.sineOut)
				.to({scaleX:0.5, scaleY:0.5, alpha:0.5}, 600, createjs.Ease.sineIn)
				.call(this.removeTwinkle, [this.twinkle]);
		},
		// 蜑企勁
		removeTwinkle: function(e){
			stage2.removeChild(e);
		}

	}

	setInterval(function(){
		new Particle();
	}, 50);


}



//繝ｪ繧ｵ繧､繧ｺ
function changeWindowSize(){

	windowW = $w.innerWidth();

	// stage, stage3
	stage.canvas.width = stage3.canvas.width = windowW;
	stage.canvas.height = stage3.canvas.height = windowH;

}



//繧､繝吶Φ繝�
//----------------------------------------

//繝ｪ繧ｵ繧､繧ｺ
var timer;
$w.on('resize', function(){
	clearTimeout( timer );
	timer = setTimeout(function() {
		//蜃ｦ逅��螳ｹ
		changeWindowSize();
	}, 300 );
});

// init();





function handleTick(){
	animate();
}

return;

});
