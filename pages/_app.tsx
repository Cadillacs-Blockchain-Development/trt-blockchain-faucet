import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Particles from "../components/ui/Particles";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   // Initialize Vanta effect
  //   NET({
  //     el: "vanta",
  //     mouseControls: true,
  //     touchControls: true,
  //     gyroControls: true,
  //     minHeight: 200.0,
  //     minWidth: 200.0,
  //     scale: 1.0,
  //     scaleMobile: 1.0,
  //     color: 0xffc63f,
  //     backgroundColor: 0x201b20,
  //     points: 13.0,
  //     maxDistance: 22.0,
  //   });
  // }, []);
  return (
    <div className="vanta" id="#vanta">
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        activeChain={activeChain}
      >
        <Component {...pageProps} />
        <Particles id="tsparticles" />
      </ThirdwebProvider>
    </div>
  );
}

export default MyApp;
