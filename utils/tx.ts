import { TransactionResponse } from "@ethersproject/providers";
import { ethers } from "ethers";

export async function waitForTx(tx: TransactionResponse) {
  return await tx.wait(1);
}
