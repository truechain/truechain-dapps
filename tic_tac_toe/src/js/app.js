App = {
	gameId: '',
	gameStatus: 0,	// 0未开始，1已开始，2已结束
	gameResult: 0,	// 0未结束，1玩家1胜出，2玩家2胜出，3平局
	addressPlayer1: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
	addressPlayer2: '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',
	isPlayer1: true,
	board_data: '000000000',
	web3Provider: null,
	contracts: {},

	init: function() {
		return App.initWeb3();
	},

//初始化web3对象
	initWeb3: function() {
		// 判断是否有一个注入的web3实例
		if (typeof web3 !== 'undefined') {
			console.log('web3 已经注入！');
			App.web3Provider = web3.currentProvider;
		} else {
			console.log('web3 被重新实例化！');
			// 如果没有发现注入的web3实例，则返回到Ganache
			App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
		}
		web3 = new Web3(App.web3Provider);

		return App.initContract();//自定义函数
	},

//初始化合约，注意合约名称，使用的是编译好的json文件名
	initContract: function() {
		// 加载TicTacToeToken.json
		$.getJSON('TicTacToeToken.json', function(data) {
			// 用TicTacToeToken.json数据创建一个可交互的TruffleContract合约实例。
			var TicTacToeTokenArtifact = data;
			App.contracts.TicTacToeToken = TruffleContract(TicTacToeTokenArtifact);
       //App.contracts.contractName，对应上面json上的命名contractName
			// 设置合约的提供者
			App.contracts.TicTacToeToken.setProvider(App.web3Provider);

			// 返回我们的合约
			return App.markTicTacToeToken();//自定义函数
		});
		return App.bindEvents();//自定义函数
	},

	bindEvents: function() {

	},

  //部署、加载合约并获得帐户信息，哪个用户？
	markTicTacToeToken: function(data, account) {
		console.log('markTicTacToeToken::call');
		var contractInstance;

		App.contracts.TicTacToeToken.deployed().then(function(instance) {//返回合约对象。
			console.log('markTicTacToeToken::合约加载成功！');
			contractInstance = instance;

			// 调用合约的SayHi()来测试合约加载, 用call读取信息不用消耗gas
			return contractInstance.SayHi.call(); //SayHi合约方法

		}).then(function(data) {
			console.log('数据：' + data);

			// 获取用户账号
			web3.eth.getAccounts(function(error, accounts) {
				if (error) {
					console.log('获取eth账户错误！err:' + error);
				}

				if(accounts.length == 0){
					console.log('eth账户列表为空！');
				}else{
					var total = accounts.length;
					var account = accounts[0];
					console.log('eth账号总数：' + total + '，默认eth账户：' + account);
					var account1 = accounts[1];
					console.log('eth账号总数：' + total + '，默认eth账户：' + account1);
				}
			});

			App.readGameList();//自定义函数


		}).catch(function(err) {
			console.log('合约加载失败！err=' + err.message);

			App.updateGameUI();
		});
	},

	onClickBtnStatus: function() {
		console.log('onClickBtnStatus::读取数据...');

		if(App.gameStatus == 0){
			// 开始创建游戏
			App.createGame();//自定义函数
		}else{
			// 读取游戏数据
			App.readGameList();//自定义函数
		}
	},

	onClickBtnPlay: function(index) {
		console.log("onClickBtnPlay::index=" + index);

		if(App.gameResult > 0){
			alert('游戏已经结束！');
			return;
		}

		var row = parseInt(index/3);
		var column = parseInt(index%3);
		console.log('row=' + row + ', column=' + column);

		App.moveChessPieces(row, column);//自定义函数
	},

	// 创建一个游戏
	createGame: function(){
		console.log('createGame::开始游戏...');
		var contractInstance;

		App.contracts.TicTacToeToken.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.createGame(App.addressPlayer1, App.addressPlayer2);//合约方法

		}).then(function(result) {
			console.log('游戏创建成功！');
			console.log(result);

			App.gameStatus = 1;
			App.readGameList();

		}).catch(function(err) {
			console.log('游戏创建失败！err：' + err.message);
		});
	},

	// 放置一个棋子
	moveChessPieces: function(row, column) {
		console.log('moveChessPieces::gameid=' + App.gameId + ', isPlayer1=' + App.isPlayer1 + ', row=' + row + ', column=' + column);
		var contractInstance;
		var gameid = App.gameId;
		var isplayer = 1;
		if(!App.isPlayer1){
			isplayer = 2;
		}

		App.contracts.TicTacToeToken.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.setGameData(parseInt(isplayer), parseInt(gameid), row, column);//合约方法

		}).then(function(result) {
			console.log('moveChessPieces::设置结果：');
			console.log(result);

			App.isPlayer1 = !App.isPlayer1;
			App.readGameList(); //系统方法

		}).catch(function(err) {
			console.log('moveChessPieces::设置错误！err=' + err.message);
		});
	},

   //读取游戏数据并显示或更新界面
	readGameList: function() {
		console.log('readGameList::读取数据...');
		var contractInstance;

		App.contracts.TicTacToeToken.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.getGameTotal(); //合约方法

		}).then(function(result) {
			console.log('读取结果：' + result);

			var game_total = result;
			if(0 < game_total){
				App.gameId = game_total - 1;
				App.gameStatus = 1;
				App.readGameDetail(game_total-1);//自定义函数
			}else{
				App.updateGameUI();//自定离函数
			}

		}).catch(function(err) {
			console.log('读取错误！err=' + err.message);
		});
	},

  //读取游戏详情
	readGameDetail: function(_gameid) {
		console.log('readGameDetail::读取游戏详情！gameid:' + _gameid);
		var contractInstance;

		App.contracts.TicTacToeToken.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.getGameDetailById(parseInt(_gameid)); //合约方法

		}).then(function(result) {
			console.log('读取结果：' + result);

			var _player1 = result[0];
			var _player2 = result[1];
			var _game_result = result[2];
			var _board_data = result[3];

			console.log('player1:' + _player1);
			console.log('player2:' + _player2);
			console.log('game_result:' + _game_result);
			console.log('board_data:' + _board_data);

			App.gameResult = _game_result;

			App.board_data = '';
			for(var i = 0; i < 9; i ++){
				App.board_data += _board_data[i].toString();
			}
			App.updateGameUI();

		}).catch(function(err) {
			console.log('读取错误！err=' + err.message);
		});
	},

	showGameStatus: function(text) {
		console.log('showGameStatus::text=' + showGameStatus);
		document.getElementById('game_status_text').innerText = text.toString();
	},

	updateGameUI: function() {
		console.log('updateGameUI::App.gameStatus=' + App.gameStatus);
		if(App.gameStatus == 0){
			// 创建游戏
			console.log('updateGameUI::创建游戏......');
			document.getElementById('game_status_text').innerText = '去创建游戏';
			document.getElementById('game_status_btn').innerText = '创建游戏';

		}else{
			//
			document.getElementById('game_status_btn').innerText = '刷新游戏';

			if(App.gameResult == 11 || App.gameResult == 13 || App.gameResult == 15){
				document.getElementById('game_status_text').innerText = 'alice胜出！';
			}else if(App.gameResult == 12 || App.gameResult == 14 || App.gameResult == 16){
				document.getElementById('game_status_text').innerText = 'bob胜出！';
			}else if(App.gameResult == 99){
				document.getElementById('game_status_text').innerText = '平局！';
			}else{
				if(App.isPlayer1){
					document.getElementById('game_status_text').innerText = 'alice落子';
				}else{
					document.getElementById('game_status_text').innerText = 'bob落子';
				}
			}
		}

		for(var i = 0; i < 9; i ++){
			var btn_img = document.getElementById('game_btn_board_' + i);
			var flag = App.board_data.substr(i, 1);
			if(flag == '1'){
				btn_img.src = 'images/board_btn_1.png';
			}else if(flag == '2'){
				btn_img.src = 'images/board_btn_2.png';
			}else{
				btn_img.src = 'images/board_btn_0.png';
			}
		}
	}

};

$(function() {
	$(window).load(function() {
		App.init();
	});
});
