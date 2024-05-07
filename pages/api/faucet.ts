import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import canRecieve from "../../src/canRecieve";
import transferCoin from "../../src/transferCoin";
import UserData from "../../modal/UserData.ts";
import { connectDb } from "../../utils/Database";

type Message = {
  message: string;
};

/*
 * Transfer coin to address. This is native token ie ETH
 * @param {string} address - The address to transfer to
 * @returns {Message} - The message to display to the user, either error message or transaction hash
 * @example curl -X POST -H "Content-Type: application/json" -d '{"address": "0x123", "hcaptchaToken": "123"}' http://localhost:3000/api/faucet
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  await connectDb();
  // parse the request body
  const { address, ipAddress } = JSON.parse(req.body);

  const saveDataToDb = await UserData.create({
    walletAddress: address,
    ipAddress: ipAddress,
  });

  // verify address
  const isAddress = ethers.utils.isAddress(address);
  // if invalid address
  if (!isAddress) return res.status(400).json({ message: "Invalid Address" });
  // if cooldown is enough to recieve funds
  const recieved = await canRecieve(address);
  // if not enough time has passed
  if (!recieved.success)
    return res.status(400).json({ message: recieved.message });
  // transfer coin
  const transfer = await transferCoin(address);
  // if transfer was unsuccessful
  if (!transfer.success)
    return res.status(400).json({ message: transfer.message });
  // update the last transfer timestamp to now

  // transfer is successful
  return res.status(200).json({ message: transfer.message });
}
