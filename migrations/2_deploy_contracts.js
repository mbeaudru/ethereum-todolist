var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TodoList);
};
