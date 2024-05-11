import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import telegramLogo from "../assets/telegram.png";
import twitterLogo from "../assets/twitter.png";
import instagramLogo from "../assets/instagram.png";
import radditLogo from "../assets/reddit.png";
import githubLogo from "../assets/github.png";
import mailLogo from "assets/MAIL.png";
import { acme } from "../utils/font";
import { Button } from "./ui/button";

const Footer = () => {
  const socialLinks = [
    {
      name: "Telegram",
      link: "https://t.me/TRUST_AI_OFFICIAL",
      icon: telegramLogo,
    },
    {
      name: "Twitter",
      link: "https://twitter.com/TRUST_AI_",
      icon: twitterLogo,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/trust_ai_/?__coig_restricted=1",
      icon: instagramLogo,
    },
    {
      name: "Reddit",
      link: "https://www.reddit.com/user/TRUST-AI/",
      icon: radditLogo,
    },
    {
      name: "Github",
      link: "https://github.com/TRUSTAIOFFICIAL",
      icon: githubLogo,
    },
    {
      name: "Mail",
      link: "mailto:contact@trust-ai.io",
      icon: mailLogo,
    },
  ];

  const servicesData = [
    {
      title: "Create Token",
      link: "https://www.trust-ai.io/createTokenmaker",
      commingSoon: false,
    },
    {
      title: "Swap",
      link: "https://www.trust-ai.io/swap",
      commingSoon: false,
    },
    {
      title: "Staking",
      link: "https://www.trust-ai.io/stake",
      commingSoon: false,
    },
    {
      title: "NFT AI",
      link: "https://www.trust-ai.io/comingsoon",
      commingSoon: true,
    },
  ];

  const resourcesData = [
    {
      title: "Whitepaper",
      link: "https://trust-ai-1.gitbook.io/whitepaper-trust-ai",
    },
    {
      title: "Github",
      link: "https://github.com/TRUSTAIOFFICIAL",
    },
    {
      title: "Documentation",
      link: "https://trust-ai-1.gitbook.io/whitepaper-trust-ai/overview/our-ecosystem",
    },
  ];

  const communityData = [
    {
      title: "Telegram",
      link: "https://t.me/TRUST_AI_OFFICIAL",
    },
    {
      title: "X(Twitter)",
      link: "https://twitter.com/TRUST_AI_",
    },
  ];
  return (
    <>
      <div className={`${acme.className} px-5 lg:px-80`}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          <div className="col-span-1 lg:col-span-2">
            {" "}
            <div className="flex items-center gap-5">
              <Image src={logo} alt="logo" width={75} height={75} />

              <h3 className={acme.className}>
                <span className="font-normal text-2xl text-[#fff]">TRUST</span>{" "}
                <span className="font-normal text-2xl bg-clip-text text-transparent bg-text-linear-gradient">
                  AI
                </span>
              </h3>
            </div>
            <div className="text-start text-[#71717a] font-normal text-lg max-w-[350px] mt-4">
            Description: Experience the game-changing TRT Chain from TRUST Al, seamlessly integrating Al for smart contracts, and storage convenience, accessible to everyone. Discover the unmatched speed and security of the blockchain, coupled with the simplicity of the easiest crypto wallet, then embark on NFT creation with ease.
            </div>
            <div className="flex justify-start space-x-4 mt-8">
              {socialLinks.map((link) => (
                <>
                  <a href={link.link} key={link.name}>
                    <Image
                      src={link.icon}
                      alt={link.name}
                      width={35}
                      height={33}
                    />
                  </a>
                </>
              ))}
            </div>
            <div className="w-fit mt-10">
              <Button
                // onClick={switchNetwork}
                type="submit"
                className="disabled:opacity-25 group relative flex w-full justify-center rounded-md border border-transparent bg-text-linear-gradient p-6 text-base font-medium text-black hover:bg-text-linear-gradient/80 "
              >
                Add Network
              </Button>
            </div>
          </div>

          <div className="text-[#FFFFFF] font-normal text-sm mt-5 lg:mt-0">
            SERVICES
            {servicesData.map((service) => (
              <div key={service.title} className="my-3">
                <a href={service.link}>{service.title}</a>
                {service.commingSoon && (
                  <span className="mx-3 bg-[#3E3106] p-1 text-[#9F6504] rounded-lg text-xs font-normal">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="text-[#FFFFFF] font-normal text-sm mt-5 lg:mt-0">
            RESOURCES
            {resourcesData.map((resource) => (
              <div key={resource.title} className="my-3">
                <a href={resource.link}>{resource.title}</a>
              </div>
            ))}
          </div>
          <div className="text-[#FFFFFF] font-normal text-sm mt-5 lg:mt-0">
            COMMUNITY
            {communityData.map((community) => (
              <div key={community.title} className="my-3">
                <a href={community.link}>{community.title}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-[#ede9fe] font-normal text-sm mt-20 mb-5">
        Copyright © 2024 Trust AI. All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;
