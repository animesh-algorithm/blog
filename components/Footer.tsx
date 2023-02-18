import Image from "next/image";
import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState("2023");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="flex flex-col md:flex-row items-center justify-start w-full h-36 md:h-[100px] bg-gray-800 text-white">
      {/* Logo */}
      <div className="flex flex-row items-center justify-center w-full h-24 mt-5 md:mt-0">
        <Image src="/rain.jpeg" alt="Animesh Sharma" width="40" height="40" />
      </div>
      {/* Copyright */}
      <div className="flex flex-row items-center justify-center w-full h-24">
        <p className="text-md">
          © {currentYear} Animesh Sharma. All rights reserved.
        </p>
      </div>
      {/* Social Media */}
      <div className="flex flex-row items-center justify-center w-full h-24 space-x-1">
        <SocialIcon
          url="https://www.linkedin.com/in/animesharma3/"
          bgColor="#000000"
          fgColor="#ffffff"
          style={{ height: 40, width: 40 }}
        />
        <SocialIcon
          url="https://www.github.com/animesharma3/"
          bgColor="#000000"
          fgColor="#ffffff"
          style={{ height: 40, width: 40 }}
        />
        <SocialIcon
          url="https://www.youtube.com/@animesharma3"
          bgColor="#000000"
          fgColor="#ffffff"
          style={{ height: 40, width: 40 }}
        />
        <SocialIcon
          url="https://www.instagram.com/animesharma3"
          bgColor="#000000"
          fgColor="#ffffff"
          style={{ height: 40, width: 40 }}
        />
        <SocialIcon
          url="https://www.twitter.com/animesharma3"
          bgColor="#000000"
          fgColor="#ffffff"
          style={{ height: 40, width: 40 }}
        />
      </div>
    </footer>
  );
};

export default Footer;
