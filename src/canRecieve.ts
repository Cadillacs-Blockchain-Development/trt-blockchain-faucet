
type CanRecieve = {
    success: boolean;
    message: string;
};

/*
 * Check if the address can transfer. Must wait for cooldown to pass
 * @param {string} address - The address to check
 * @returns {CanRecieve} - The result of the check
 */
export default async function canRecieve(address: string): Promise<CanRecieve> {
    // get timestamp in seconds
    //todo
    // if address never been transfered to
    //todo
    // now in seconds
    const now = Math.floor(Date.now() / 1000);
    // cooldown in seconds
    const cooldown = parseInt(process.env.COOLDOWN_HOURS as string) * 60 * 60;
    // if asked for funds after cooldown
    //todo
    return { success: true, message: "🚢" };
    // calculate time left in hours
    //todo
    return {
        success: false,
        message: `Please wait X hours before requesting again`,
    };
}
