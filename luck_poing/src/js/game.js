Game = {

	contracts: {},

	init: function() {
		return Game.initUI();
	},

	// 初始化动态UI
	initUI: function() {
		console.log("IN Game initUI...");
	},
};

window.onload=function(){
	Game.init();
};
