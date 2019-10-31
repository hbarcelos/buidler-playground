pragma solidity ^0.5.12;

contract Counter {
  uint count = 0;

  event CountedTo(uint number);

  constructor(uint initial) public {
    count = initial;
  }

  function countUp() public returns (uint) {
    uint newCount = count + 1;
    require(newCount > count, "counter overflow");

    count = newCount;

    emit CountedTo(count);
    return count;
  }

  function countDown() public returns (uint) {
    uint newCount = count - 1;
    require(newCount < count, "counter underflow");

    count = newCount;

    emit CountedTo(count);
    return count;
  }

  function getCount() public view returns(uint) {
    return count;
  }
}
