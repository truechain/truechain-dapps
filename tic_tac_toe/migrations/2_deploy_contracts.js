var TicTacToeToken = artifacts.require("TicTacToeToken");

module.exports = function(deployer) {
	deployer.deploy(TicTacToeToken);
};
