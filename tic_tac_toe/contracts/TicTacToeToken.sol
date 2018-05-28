pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract TicTacToeToken is StandardToken {

	string public name = "TicTacToeToken";
	string public symbol = "TTTC";
	uint public decimals = 18;
	uint public INITIAL_SUPPLY = 10000 * (10 ** decimals);
	uint public board_len = 9;

	struct Game {
		address player1;
		address player2;
		uint[] game_board;
	}

	Game[] games;

	event GameCreate(address _player1, address _player2, uint256 gameId);

	function __construct() public {
		balances[msg.sender] = INITIAL_SUPPLY;
	}

	function totalSupply() public view returns (uint256) {
		return INITIAL_SUPPLY;
	}

	function createGame(address _player1, address _player2) public returns (uint) {
		return _createGame(_player1, _player2);
	}

	function setGameData(uint _isplayer1, uint256 _gameId, uint row, uint column) external {
		uint i = row*3 + column;
		Game storage _game = games[_gameId];
		if(_isplayer1 == 1){
			_game.game_board[i] = 1;
		}else{
			_game.game_board[i] = 2;
		}
	}

	function getGameTotal() external view returns (uint256 total) {
		total = games.length;
	}

	function getGameDetailById(uint256 _gameId) external view returns (
		address _player1,
		address _player2,
		uint _game_result,
		uint[9] _game_board)
	{

		Game storage _game = games[_gameId];
    _player1 = _game.player1;
		_player2 = _game.player2;
		uint i = 0;
		for(i = 0; i < 9; i ++){
			_game_board[i] = _game.game_board[i];
		}
		_game_result = _checkGameResult(_gameId);
	}

	function _createGame(address _player1, address _player2) private returns (uint256) {
		Game memory _game = Game({
			player1: _player1,
			player2: _player2,
			game_board: new uint[](board_len)
		});

		uint i = 0;
		for(i = 0; i < board_len; i ++){
			_game.game_board[i] = 0;
		}

		uint256 newGameId = games.push(_game);

		// 确保新id不过超过40多亿的上限（虽然可能性非常低）
		require(newGameId == uint256(uint32(newGameId)));

		// 触发游戏创建事件
		emit GameCreate(_player1, _player2, newGameId);

		return newGameId;
	}

	// 判断棋局胜负：0未结束，1玩家1胜出，2玩家2胜出，3平局
	function _checkGameResult(uint256 _gameId) private view returns (uint _check_result){

		Game storage _game = games[_gameId];
		uint _game_result = 0;
		if((_game.game_board[0] == _game.game_board[4] && _game.game_board[4] == _game.game_board[8]) ||
				(_game.game_board[1] == _game.game_board[4] && _game.game_board[4] == _game.game_board[7]) ||
				(_game.game_board[2] == _game.game_board[4] && _game.game_board[4] == _game.game_board[6]) ||
				(_game.game_board[3] == _game.game_board[4] && _game.game_board[4] == _game.game_board[5])) {
			//  x | - | -    - | x | -    - | - | x    - | - | -
			//  - | x | -    - | x | -    - | x | -    x | x | x
			//  - | - | x    - | x | -    x | - | -    - | - | -
			if (_game.game_board[4] == 1) {
				_game_result = 11;
			} else if (_game.game_board[4] == 2) {
				_game_result = 12;
			}
		} else if ((_game.game_board[0] == _game.game_board[1] && _game.game_board[1] == _game.game_board[2]) ||
								(_game.game_board[0] == _game.game_board[3] && _game.game_board[3] == _game.game_board[6])) {
			//  x | x | x       x | - | -
			//  - | - | -       x | - | -
			//  - | - | -       x | - | -
			if (_game.game_board[0] == 1) {
				_game_result = 13;
			} else if (_game.game_board[0] == 2) {
				_game_result = 14;
			}
		} else if ((_game.game_board[2] == _game.game_board[5] && _game.game_board[5] == _game.game_board[8]) ||
							(_game.game_board[6] == _game.game_board[7] && _game.game_board[7] == _game.game_board[8])) {
			//  - | - | x       - | - | -
			//  - | - | x       - | - | -
			//  - | - | x       x | x | x
			if (_game.game_board[8] == 1) {
				_game_result = 15;
			} else if (_game.game_board[8] == 2) {
				_game_result = 16;
			}
		} else {
			// 如果棋局都落满了子，并且没有胜出者，则结果为平局
			bool is_board_full = true;
			uint i = 0;
			for (i = 0; i < board_len; i++) {
				if (_game.game_board[i] == 0) {
					is_board_full = false;
					break;
				}
			}
			if (is_board_full) {
				_game_result = 99;
			}
		}
		return _game_result;
	}

	function SayHi() pure public returns (string) {
		return "Hi~ My TicTacToe Game!";
	}
}
