import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Particles from "../components/ui/Particles";
// import NET from "vanta/dist/vanta.NET.min";z
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       NET({
  //         el: vantaRef.current,
  //         THREE: THREE,
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 600.0,
  //         minWidth: 600.0,
  //         scale: 1.0,
  //         scaleMobile: 1.0,
  //         backgroundColor: 0x000,
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <div className="vanta" id="#vanta">
        <Component {...pageProps} />
        <Particles />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
