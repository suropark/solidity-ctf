// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HackPreservation {
    uint public timeZoneLibrary0; // to change library contract address
    uint public timeZoneLibrary1; // to change library contract address
    uint public timeZoneLibrary2; // storage2

    function setTime(uint _time) public {
        timeZoneLibrary2 = _time;
    }
}
