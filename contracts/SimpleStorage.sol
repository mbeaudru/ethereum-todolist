pragma solidity ^0.4.2;

contract SimpleStorage {
  uint storedData;

  function set(uint x) {
    storedData = x;
  }

  function get() constant returns (uint) {
    return storedData;
  }

  function double(int a) constant returns(int) {
    return 2*a;
  }
}
