import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import canRecieve from "../../src/canRecieve";
import transferCoin from "../../src/transferCoin";
import UserData from "../../modal/UserData";
import { connectDb } from "../../utils/Database";

type Message = {
  message: string;
};

/**
 * This TypeScript function handles a POST request, saves data to a database, verifies an address,
 * checks for cooldown period, transfers coins, and returns appropriate responses.
 * @param {NextApiRequest} req - NextApiRequest - Represents the incoming HTTP request in a Next.js API
 * route handler.
 * @param res - The `res` parameter in the code snippet refers to the response object that will be sent
 * back to the client making the request. It is of type `NextApiResponse<Message>`, where `Message` is
 * the type of response that will be sent back. In this case, it seems like the response
 * @returns The handler function is returning a JSON response with a message indicating the status of
 * the transfer process. If the transfer is successful, it will return a status of 200 with a success
 * message. If there are any errors during the transfer process such as an invalid address,
 * insufficient cooldown time, or unsuccessful transfer, it will return a status of 400 with an error
 * message describing the issue.
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
