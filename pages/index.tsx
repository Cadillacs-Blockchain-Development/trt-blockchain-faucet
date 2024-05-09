import Head from "next/head";
import Faucet from "../components/Faucet";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>TrustAI Testnet Faucet</title>
        <meta name="description" content="TrustAI Testnet Faucet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main>
        <Navbar />
        <Faucet />
      </main>
    </>
  );
}
