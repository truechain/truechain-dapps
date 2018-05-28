App = {
	gameId: '',//游戏ID，每次游戏的唯一值
	gameStatus: 0,//是否开始
	gameResult: 0,//谁赢
	statePlayer1: 0,//0未下注 1已下注 2已开牌
	statePlayer2: 0,
	addressPlayer1: '0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2',
	addressPlayer2: '0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e',
	web3Provider: null,
	contracts: {},


	init: function() {
		return App.initWeb3();
	},

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

		return App.initContract();
	},

	initContract: function() {
		// 加载LuckPoint.json
		$.getJSON('LuckPoing.json', function(data) {
			// 用LuckPoint.json数据创建一个可交互的TruffleContract合约实例。
			var LuckPointArtifact = data;
			App.contracts.LuckPoint = TruffleContract(LuckPointArtifact);

			// 设置合约的提供者
			App.contracts.LuckPoint.setProvider(App.web3Provider);

			// 返回我们的合约
			return App.markLuckPoint();
		});
		return App.bindEvents();
	},

	bindEvents: function() {

	},

	markLuckPoint: function(data, account) {
		console.log('markLuckPoint::call');
		var contractInstance;

		App.contracts.LuckPoint.deployed().then(function(instance) {
			console.log('markLuckPoint::合约加载成功！');
			contractInstance = instance;

			// 调用合约的SayHi()来测试合约加载, 用call读取信息不用消耗gas
			return contractInstance.SayHi.call();

		}).then(function(data) {
			console.log('markLuckPoint::数据：' + data);

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
				}
			});

			App.readGameList();


		}).catch(function(err) {
			console.log('合约加载失败！err=' + err.message);

			App.updateGameUI();
		});
	},

	onClickBtnCreate: function() {
		console.log('onClickBtnCreate::...');
		App.createGame();
	},

	onClickBtnStatus: function() {
		console.log('onClickBtnStatus::...');
		App.readGameList();
	},

	onClickBtnPlay: function(play_id) {
		console.log("onClickBtnPlay::play_id=" + play_id);
		if(play_id == 1){
			if(App.statePlayer1 > 0 && App.statePlayer2 == 0){
				alert('玩家2还未下注！');
				return;
			}
			if(App.statePlayer1 > 1){
				alert('玩家1已经开牌！');
				return;
			}
		}else{
			if(App.statePlayer2 > 0 && App.statePlayer1 == 0){
				alert('玩家1还未下注！');
				return;
			}
			if(App.statePlayer2 > 1){
				alert('玩家2已经开牌！');
				return;
			}
		}

		App.setPlayerState(play_id)
	},

	createGame: function() {
		console.log('createGame::...');

		var contractInstance;
		App.contracts.LuckPoint.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.createGame(App.addressPlayer1, App.addressPlayer2);

		}).then(function(result) {
			console.log('createGame::创建游戏成功！结果信息：');
			console.log(result);

			App.readGameList();

		}).catch(function(err) {
			console.log('createGame::读取错误！err=' + err.message);
		});
	},

	setPlayerState: function(play_id) {
		console.log('setPlayerState::play_id=' + play_id);

		var gameStateText = document.getElementById('game_status_text');
		if(App.gameId === ''){
			gameStateText.innerText = '请先创建游戏！';
			alert('请先创建游戏！');
			return;
		}

		var _isPlayer1 = 1;
		var _statePlayer = App.statePlayer1;
		if(play_id != 1){//玩家2
			_isPlayer1 = 0;
			_statePlayer = App.statePlayer2;
		}

		//前面这个玩家的状态判断
		if(_statePlayer == 0){
			_statePlayer = 1;
		}else{	// 1 or 2
			_statePlayer = 2;
		}

		var contractInstance;
		App.contracts.LuckPoint.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.setGameData(parseInt(App.gameId), _isPlayer1, _statePlayer);

		}).then(function(result) {
			console.log('setPlayerState::设置游戏状态成功！结果信息：');
			console.log(result);

			App.readGameList();

		}).catch(function(err) {
			console.log('setPlayerState::设置游戏状态错误！err=' + err.message);
		});
	},

	readGameList: function() {
		console.log('readGameList::...');

		var contractInstance;
		App.contracts.LuckPoint.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.getGameTotal();

		}).then(function(result) {
			console.log('readGameList::读取结果：' + result);

			var game_total = result;
			if(0 < game_total){
				var _gameId = game_total - 1;	// 取最后一个作为当前游戏
				App.gameId = _gameId;
				App.readGameDetail(_gameId);
			}else{
				App.updateGameUI();
			}

		}).catch(function(err) {
			console.log('readGameList::读取错误！err=' + err.message);
		});
	},

	readGameDetail: function(_gameid) {
		console.log('readGameDetail::读取游戏详情！gameid:' + _gameid);

		var contractInstance;
		App.contracts.LuckPoint.deployed().then(function(instance) {
			contractInstance = instance;
			return contractInstance.getGameDetailById(parseInt(_gameid));

		}).then(function(result) {
			console.log('游戏详情读取结果：' + result);

			var _statePlayer1 = result[0];
			var _statePlayer2 = result[1];
			var _game_result = result[2];

			console.log('_statePlayer1:' + _statePlayer1);
			console.log('_statePlayer2:' + _statePlayer2);
			console.log('game_result:' + _game_result);

			App.statePlayer1 = _statePlayer1;
			App.statePlayer2 = _statePlayer2;
			App.gameResult = _game_result;

			App.updateGameUI();

		}).catch(function(err) {
			console.log('读取错误！err=' + err.message);
		});
	},

	updateGameUI: function() {
		console.log('updateGameUI::App.gameId=' + App.gameId);

		var gameStateText = document.getElementById('game_status_text');

		if(App.gameResult == 1){
			gameStateText.innerText = 'Alice胜出';
		}else if(App.gameResult == 2){
			gameStateText.innerText = 'Bob胜出';
		}else if(App.gameResult == 3){
			gameStateText.innerText = '平局！';
		}else{
			if(App.statePlayer1 == 0 || App.statePlayer2 == 0){
				gameStateText.innerText = '玩家可以下注了！';
			}else if(App.statePlayer1 == 1 || App.statePlayer2 == 1){
				gameStateText.innerText = '玩家可以开牌了！';
			}else{
				gameStateText.innerText = '等待玩家开牌！';
			}
		}

		var buttonPlayer1 = document.getElementById('button_player1');
		if(App.statePlayer1 == 0){
			buttonPlayer1.innerText = '下注';
		}else if(App.statePlayer1 == 1){
			buttonPlayer1.innerText = '开牌';
		}else if(App.statePlayer1 == 2){
			buttonPlayer1.innerText = '已开牌';
		}else{
			buttonPlayer1.innerText = '未知';
		}

		var buttonPlayer2 = document.getElementById('button_player2');
		if(App.statePlayer2 == 0){
			buttonPlayer2.innerText = '下注';
		}else if(App.statePlayer2 == 1){
			buttonPlayer2.innerText = '开牌';
		}else if(App.statePlayer2 == 2){
			buttonPlayer2.innerText = '已开牌';
		}else{
			buttonPlayer2.innerText = '未知';
		}
	}

};

$(function() {
	$(window).load(function() {
		App.init();
	});
});
