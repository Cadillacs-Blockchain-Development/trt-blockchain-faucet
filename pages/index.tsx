import Head from "next/head";
import Faucet from "../components/Faucet";

export default function Home() {
  return (
    <>
      <Head>
        <title>TrustAI Testnet Faucet</title>
        <meta name="description" content="TrustAI Testnet Faucet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <Faucet />
      </main>
    </>
  );
}
