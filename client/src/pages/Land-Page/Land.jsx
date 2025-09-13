import React from "react";
import Navbar from "./components/Navbar";
import { ChevronRight } from "lucide-react";
import { IoLogoWindows } from "react-icons/io";
import { Button } from "@/components/ui/button";
const Land = () => {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background with Gradient and Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      >
        <div className="min-h-screen w-full bg-black relative flex flex-col items-center justify-center">
          {/* Vercel Grid */}
          <div
            className="absolute inset-0 z-0 opacity-60"
            style={{
              backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
              backgroundSize: "50px 50px",
            }}
          />
          <div className="bg-transparent border-[1px] border-zinc-800 rounded-full p-1">
            <div className="bg-zinc-900 rounded-full flex items-center px-2 py-1">
              ✨
              <h1 className="text-sm font-[poppins]">
                Welcome to <span>TimmyVision</span>
              </h1>
              <ChevronRight />
            </div>
          </div>
          <div className="mt-8 flex w-11/12 max-w-4xl flex-col items-center md:w-full">
            <div>
              <h1 className="text-4xl md:text-8xl text-center font-[inter]">
                Stop Misinformation Before It Spreads
              </h1>
            </div>

            <p className="mt-6 text-center font-[poppins] text-base text-zinc-600 md:text-lg">
              Our AI-powered platform detects deepfakes and misinformation in
              real time, helping you stay informed and make decisions based on
              truth. Protect yourself from digital deception with cutting-edge
              detection technology
            </p>

            <div className="relative mt-8 hidden w-full items-center justify-center gap-4 md:mt-12 md:flex">
              <div className="border-zinc-600 border-[1px] p-1 rounded-xl hover:border-zinc-400">
                <Button className="bg-white text-black py-7 px-4 hover:bg-white ">
                  <IoLogoWindows /> Downloads Extension
                </Button>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        {/* Your other content goes here */}
      </div>
    </div>
  );
};

export default Land;
