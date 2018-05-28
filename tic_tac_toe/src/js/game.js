Game = {

	contracts: {},

	init: function() {
		return Game.initUI();
	},

	// 初始化动态UI
	initUI: function() {
		console.log("IN Game initUI...");

		// 获取控制面板容器元素
		var containerbox = document.getElementById("game_box");

		// 先清空无用的矩阵按钮
		for(var i = 1; i <= 3; i ++){
			var elerow = "game_box_row_" + i;
			var removeObj = document.getElementById(elerow);
			if(removeObj && removeObj.parentNode){
				removeObj.parentNode.removeChild(removeObj);
			}
		}

		// 开始加载矩阵按钮
		var index_btn = 0;
		for(var i = 1; i <= 3; i ++){
			var subelestr = '<div id="game_box_row_' + i + '" class="game_box_row">';
			for(var j = 1; j <= 3; j ++){
				subelestr += '<div class="game_box_column">';
				subelestr += '<button class="game_box_btn" type="button" onclick="App.onClickBtnPlay(' + index_btn + ');">';
				subelestr += '<img id="game_btn_board_' + index_btn + '" src="images/board_btn_0.png" width="80" height="80">';
				subelestr += '</button>';
				subelestr += '</div>';
				index_btn += 1;
			}
			subelestr += '</div>';

			var rowdiv = document.createElement('div');
			rowdiv.innerHTML = subelestr;
			containerbox.append(rowdiv);
		}
	},
};

window.onload=function(){
	Game.init();
};
