import Head from "next/head";
import Faucet from "../components/Faucet";
import Navbar from "../components/Navbar";
import Script from "next/script";
import Footer from "../components/Footer";
import Faqs from "../components/Faqs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>TrustAI Testnet Faucet</title>
        <meta name="description" content="TrustAI Testnet Faucet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></Script> */}
      <main>
        <Navbar />
        <Faucet />
        <div className="absolute top-[20%] -left-1/4 w-screen z-10 h-dvh scale-150">
          <Image
            src="https://www.trust-ai.io/layer/Vector14.png"
            alt="gradient vector"
            fill
          />
        </div>
        <div className="absolute top-0 -right-[10%] rotate-180 w-screen z-10 h-dvh">
          <Image
            src="https://www.trust-ai.io/layer/Vector14.png"
            alt="gradient vector"
            fill
          />
        </div>
        <div className="bg-black mt-40">
          <Faqs />
          <Footer />
        </div>
      </main>
    </>
  );
}
