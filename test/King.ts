import { expect } from "chai";
import { ethers } from "hardhat";
import { deployInstance } from "../utils/deployment";
import { waitForTx } from "../utils/tx";

describe("King", () => {
  it("Be the King and break contract", async function () {
    const [deployer, hacker] = await ethers.getSigners();
    const king = await deployInstance("King");
    const hackKing = await deployInstance("HackKing", [king.address]);

    expect(await king._king(), "king should be deployer").to.equal(deployer.address);
    expect(await king.prize(), "prize should be 0").to.equal(0);
    await deployer.sendTransaction({ to: king.address, value: ethers.utils.parseEther("1") });
    // get ownership and break !
    expect(await king.prize(), "prize should be 1").to.equal(ethers.utils.parseEther("1"));

    await waitForTx(
      await hackKing.connect(hacker).getOwner({
        value: ethers.utils.parseEther("2"),
      })
    );
    expect(await king.prize(), "prize should be 2").to.equal(ethers.utils.parseEther("2"));

    expect(await king._king(), "king should be hackking contract").to.equal(hackKing.address);

    expect(
      deployer.sendTransaction({
        to: king.address,
        value: ethers.utils.parseEther("3"),
        gasLimit: 210000,
      })
    ).to.be.revertedWith("contract destroyed");
  });
});
