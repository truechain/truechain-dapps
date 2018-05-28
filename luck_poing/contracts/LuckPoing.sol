pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract LuckPoing is StandardToken {

	string public name = "LuckPoing";
	string public symbol = "LP";
	uint public decimals = 18;
	uint public INITIAL_SUPPLY = 10000 * (10 ** decimals);
	uint public board_len = 9;




	struct Game {
		address player1;
		address player2;
		uint statePlayer1;
		uint statePlayer2;
	}

	Game[] games;

	event GameCreate(address _player1, address _player2, uint256 gameId);

	function __construct() public {
		balances[msg.sender] = INITIAL_SUPPLY;
	}

	function totalSupply() public view returns (uint256) {
		return INITIAL_SUPPLY;
	}

  //used
	function createGame(address _player1, address _player2) public returns (uint) {
		return _createGame(_player1, _player2);
	}


  //used setGameData（parseInt(App.gameId), _isPlayer1, _statePlayer
	function setGameData (uint256 _gameId, uint _isplayer1, uint _statePlayer) external {
		Game storage _game = games[_gameId];
		if(_isplayer1 == 1){
			_game.statePlayer1= _statePlayer;
		}else{
			_game.statePlayer2 = _statePlayer;
		}
	}

	//used
	function getGameTotal() external view returns (uint256 total) {
		total = games.length;
	}
//used
	function getGameDetailById(uint256 _gameId) external view returns (
	uint _player1,
	uint _player2,
		uint _game_result)
	{
		Game storage _game = games[_gameId];
    _player1 = _game.statePlayer1;
		_player2 = _game.statePlayer2;
		_game_result = _checkGameResult(_gameId);
	}

	//used
	function _createGame(address _player1, address _player2) private returns (uint256) {
		Game memory _game = Game({
			player1: _player1,
			player2: _player2,
			statePlayer1:0,
			statePlayer2:0
		});
		uint256 newGameId = games.push(_game);

		// 确保新id不过超过40多亿的上限（虽然可能性非常低）
		require(newGameId == uint256(uint32(newGameId)));

		// 触发游戏创建事件
		emit GameCreate(_player1, _player2, newGameId);

		return newGameId;
	}

	// used 判断胜负：0未结束，1玩家1胜出，2玩家2胜出，3平局
	function _checkGameResult(uint256 _gameId) private view returns (uint _check_result){

		Game storage _game = games[_gameId];
		uint _game_result = 0;
		if(_game.statePlayer1==2&&_game.statePlayer2==2){
				if(_gameId%2==2){
				    _game_result=2;
				}else if(_gameId%2==1){
				    _game_result=1;
				}else{
				   _game_result=3;
				}
		}

		return _game_result;
	}

  //used
	function SayHi() pure public returns (string) {
		return "Hi~ My TicTacToe Game!";
	}
}
