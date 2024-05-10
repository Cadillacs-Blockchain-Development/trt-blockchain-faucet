"use client";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import logo from "../public/logo.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { ethers } from "ethers";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Button } from "./ui/button";
import Footer from "./Footer";

export default function Faucet() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [trtAmount, setTrtAmount] = useState(0.5);
  const [ipAddress, setIpAddress] = useState("");

  const chainId = 2910025107;

  // const switchNetwork = async () => {
  //   if (window?.ethereum.networkVersion !== chainId) {
  //     try {
  //       await window.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: ethers.utils.hexlify(chainId) }],
  //       });
  //     } catch (err: any) {
  //       // This error code indicates that the chain has not been added to MetaMask
  //       if (err.code === 4902) {
  //         await window.ethereum.request({
  //           method: "wallet_addEthereumChain",
  //           params: [
  //             {
  //               chainName: "TrustAI Testnet",
  //               chainId: ethers.utils.hexlify(chainId),
  //               nativeCurrency: {
  //                 name: "MTK",
  //                 decimals: 18,
  //                 symbol: "MTK",
  //               },
  //               rpcUrls: [
  //                 "http://13.212.80.206:8449/",
  //                 "https://13.212.80.206:8449/",
  //               ],
  //             },
  //           ],
  //         });
  //       }
  //     }
  //   }
  // };

  const fetchIpAddress = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GET_IP as string);
      const data = await response.json();
      const ipAddress = data.ip;
      setIpAddress(ipAddress);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // disable submit button
    setIsDisabled(true);
    // send request to faucet
    try {
      const response = await fetch("/api/faucet", {
        method: "POST",
        body: JSON.stringify({
          address: event.currentTarget.address.value,
          ipAddress: ipAddress,
        }),
      });
      // parse response
      const data = await response.json();
      // if error
      if (response.status !== 200) {
        setErrorMessage(data.message);
        setIsDisabled(false);
        return;
      }
      // success!
      setSuccessMessage(data.message);
      setIsDisabled(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  return (
    <>
      <div className="flex min-h-full items-center mt-16 justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full md:max-w-[60%] space-y-8 bg-[#1e2026] p-8 rounded-3xl shadow-md">
          <div className="flex gap-4 justify-center items-center text-3xl font-bold tracking-tight md:flex-row flex-col">
            <Image className="" src={logo} alt="Testnet Faucet" height={48} />
            <div className="flex">
              <div className="text-white">TrustAI</div>&nbsp;
              <div className="bg-clip-text text-transparent bg-text-linear-gradient ">
                Faucet
              </div>
            </div>
          </div>
          <div className="text-[#C4C5CB] text-center t">
            Obtain TRT Testnet tokens every 24 hours for seamless and confident
            development.
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="w-full flex md:flex-row flex-col gap-4 rounded-md shadow-sm">
              <div className="w-full basis-[28%]">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white bg-[#373943] p-3 w-full flex justify-between items-center rounded-md border-gray-300 border">
                    <div className="flex justify-center items-center gap-2">
                      <Image className="" src={logo} alt="Testnet Faucet" />
                      <span>{trtAmount} TRT</span>
                    </div>
                    <FaAngleDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full h-full text-white bg-[#373943] p-3 flex flex-col justify-between items-center border-gray-300 border">
                    <DropdownMenuLabel>Select Token</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="w-full">
                      0.5 TRT
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="w-full">
                <input
                  id="address"
                  name="address"
                  type="string"
                  required
                  className="relative block bg-[#373943] w-full appearance-none rounded-md border border-gray-300 px-3 py-4 text-[#C4C5CB] placeholder-gray-500 focus:z-10 focus:border-[#DAA200] focus:outline-none focus:border-2 focus:ring-[#DAA200] focus:ring-offset-4 sm:text-sm"
                  placeholder="Enter your TrustAI testnet address"
                />
              </div>
            </div>
            <div>
              <button
                disabled={isDisabled}
                type="submit"
                className="disabled:opacity-25 group relative flex w-full justify-center rounded-md border border-transparent bg-white p-4 text-lg font-medium text-black hover:bg-white/80 focus:border-[#DAA200] focus:border-2 focus:outline-none focus:ring-[#DAA200] focus:ring-offset-4"
              >
                {isDisabled ? (
                  <ImSpinner8 className="animate-spin" />
                ) : (
                  "Request Funds"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal message={successMessage} />
      <ErrorModal message={errorMessage} />
      <div className="w-fit ml-4 mt-20">
        {/* <Button
          // onClick={switchNetwork}
          type="submit"
          className="disabled:opacity-25 group relative flex w-full justify-center rounded-md border border-transparent bg-text-linear-gradient p-6 text-base font-medium text-black hover:bg-text-linear-gradient/80 "
        >
          Add Network
        </Button> */}
      </div>

      <Footer />
    </>
  );
}
