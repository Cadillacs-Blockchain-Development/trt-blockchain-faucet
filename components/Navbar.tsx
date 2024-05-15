import React from "react";
import logo from "../public/logo.svg";
import Image from "next/image";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <div className="top-0 px-8 py-4 w-full flex justify-between items-center bg-black max-w-[1440px] mx-auto">
      <div className="flex gap-4">
        <Image src={logo} alt="logo" />
        <div className="bg-clip-text text-transparent bg-text-linear-gradient text-2xl font-semibold">
          <span className="text-white">TRUST</span>AI
        </div>
      </div>
      <div className="flex gap-4">
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
  );
};

export default Navbar;
