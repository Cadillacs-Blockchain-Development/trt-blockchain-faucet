import React, { useState } from "react";
import logo from "../public/logo.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { IoMenu, IoClose } from "react-icons/io5";
import { cn } from "../lib/utils";
import Link from "next/link";
const Navbar = () => {
  const [mobileNavToggle, setMobileNavToggle] = useState(false);

  const navLinks = [
    { title: "Trust AI", link: "https://www.trust-ai.io" },
    { title: "Create Token", link: "https://www.trust-ai.io/createTokenmaker" },
    { title: "NFT AI", link: "https://www.trust-ai.io/nftai" },
  ];
  return (
    <>
      <div className="top-0 px-2 py-4 w-full sm:flex hidden justify-between items-center max-w-[1440px] mx-auto z-50 bg-transparent">
        <div className="flex gap-4">
          <Image src={logo} alt="logo" />
          <div className="bg-clip-text text-transparent bg-text-linear-gradient text-2xl font-semibold">
            <span className="text-white">TRUST </span>AI
          </div>
        </div>
        <div className="flex gap-4 justify-center ml-20 items-center">
          {navLinks.map((link, index) => (
            <div key={link.title}>
              <Link
                href={link.link}
                target="_blank"
                className="text-white text-lg font-medium hover:text-[#DAA200] transition"
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            variant={"outline"}
            className="bg-transparent ml-8 text-white font-medium"
          >
            Contact Us
          </Button>
          <Button className="bg-white text-black font-medium hover:bg-white/80">
            Start Building
          </Button>
        </div>
      </div>

      {/* mobile navbar */}
      <div
        className={cn(
          "sm:hidden relative top-0 px-8 py-4 w-full transition flex justify-between items-center max-w-[1440px] mx-auto z-[9999]",
          mobileNavToggle ? "bg-black" : "bg-transparent"
        )}
      >
        <div className="flex gap-4">
          <Image src={logo} alt="logo" />
          <div className="bg-clip-text text-transparent bg-text-linear-gradient text-2xl font-semibold">
            <span className="text-white">TRUST</span>AI
          </div>
        </div>
        <div
          className="flex items-center justify-center relative z-[9999]"
          onClick={() => setMobileNavToggle(!mobileNavToggle)}
        >
          {mobileNavToggle ? (
            <IoClose color="white" size={24} />
          ) : (
            <IoMenu color="white" size={24} />
          )}
        </div>
        <div
          className={cn(
            "flex flex-col justify-center items-stretch gap-4 p-6 border-t border-[#c49507] bg-black absolute top-full w-full right-1/2 translate-x-1/2 transition-all z-50",
            mobileNavToggle ? "h-[280px] opacity-100" : "h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <div key={link.title}>
                <Link
                  href={link.link}
                  target="_blank"
                  className="text-white text-lg font-medium hover:text-[#DAA200] transition"
                >
                  {link.title}
                </Link>
              </div>
            ))}
          </div>
          <Button
            variant={"outline"}
            className="bg-transparent text-white font-medium"
          >
            Contact Us
          </Button>
          <Button className="bg-white text-black font-medium hover:bg-white/80">
            Start Building
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
