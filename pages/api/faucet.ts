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
  console.log(address, ipAddress);

  try {
    // Check if the wallet address exists in the database
    const existingData = await UserData.findOne({ walletAddress: address });

    if (existingData) {
      // Calculate the time difference in hours
      const lastUpdated = new Date(existingData.date).getTime();
      const currentTime = Date.now();
      const timeDifference = (currentTime - lastUpdated) / (1000 * 60 * 60);

      // If time difference is less than 24 hours, return an error
      if (timeDifference < 24) {
        return res.status(400).json({
          message: "Action not allowed within 24 hours of last update",
        });
      }

      // Update the last transfer timestamp to now
      const updateData: any = await UserData.updateOne(
        { walletAddress: address },
        { ipAddress: ipAddress, date: Date.now() }
      );

      // Handle update success or failure
      if (updateData.nModified) {
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } else {
      // Create new data in the database if the wallet address is not found
      const saveDataToDb = await UserData.create({
        walletAddress: address,
        ipAddress: ipAddress,
        date: Date.now(),
      });

      console.log("Data saved successfully:", saveDataToDb);
    }

    // Verify address
    const isAddress = ethers.utils.isAddress(address);

    // If invalid address
    if (!isAddress) {
      return res.status(400).json({ message: "Invalid Address" });
    }

    // Check if enough time has passed to receive funds
    const received = await canRecieve(address);

    // If not enough time has passed
    if (!received.success) {
      return res.status(400).json({ message: received.message });
    }

    // Transfer coin
    const transfer = await transferCoin(address);

    // If transfer was unsuccessful
    if (!transfer.success) {
      return res.status(400).json({ message: transfer.message });
    }

    // Transfer is successful
    return res.status(200).json({ message: transfer.message });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
