// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import wallet from "../../src/wallet";

type Address = {
    address: string;
};

/**
 * The function is an asynchronous handler that retrieves an address from a wallet and sends it as a
 * JSON response.
 * @param {NextApiRequest} req - NextApiRequest - This is the request object representing the incoming
 * HTTP request.
 * @param res - NextApiResponse<Address>
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Address>) {
    const address = await wallet.getAddress();
    res.status(200).json({ address });
}
