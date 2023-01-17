import { ethers } from "hardhat";
import { expect } from "chai";
import { defaultAbiCoder } from "@ethersproject/abi";

describe("[Challenge] Truster", function () {
  let deployer, player;
  let token, pool, hack;

  const TOKENS_IN_POOL = 1000000n * 10n ** 18n;

  before(async function () {
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, player] = await ethers.getSigners();

    token = await (await ethers.getContractFactory("DamnValuableToken", deployer)).deploy();
    pool = await (await ethers.getContractFactory("TrusterLenderPool", deployer)).deploy(token.address);
    expect(await pool.token()).to.eq(token.address);

    await token.transfer(pool.address, TOKENS_IN_POOL);
    expect(await token.balanceOf(pool.address)).to.equal(TOKENS_IN_POOL);

    expect(await token.balanceOf(player.address)).to.equal(0);

    hack = await (await ethers.getContractFactory("HackTruster")).deploy(pool.address);
  });

  it("Execution", async function () {
    /** CODE YOUR SOLUTION HERE */
    // callback 활용하여 approve하고
    // transferfrom
    await hack.connect(player).hack(token.address);
  });

  after(async function () {
    /** SUCCESS CONDITIONS - NO NEED TO CHANGE ANYTHING HERE */

    // Player has taken all tokens from the pool

    expect(await token.balanceOf(player.address)).to.equal(TOKENS_IN_POOL);
    expect(await token.balanceOf(pool.address)).to.equal(0);
  });
});
