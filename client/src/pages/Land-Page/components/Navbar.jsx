import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-hot-toast";

function Navbar() {
  const { signup } = useAuthStore();
  const handleSignup = () => {
    try {
      signup();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-20 w-full  bg-[#090909] px-4 border-b border-zinc-900">
      <div className="mx-auto flex h-full items-center justify-between md:max-w-screen-xl">
        <div className="flex items-start">
          <a href="/" className="flex items-center gap-2">
            <image
              src="/assets/logo.webp"
              alt="Neurix's Logo"
              height={40}
              width={40}
            />
            <span className="text-xl font-medium">TimmyVision</span>
          </a>
        </div>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:flex">
          {/* <ul className="flex items-center justify-center gap-8">
            <li className="text-sm hover:text-foreground/80">
              <a href="/#">Prices</a>
            </li>
            <li className="text-sm hover:text-foreground/80">
              <a href="#">Features</a>
            </li>
            <li className="text-sm hover:text-foreground/80">
              <a href="#">Enterprise</a>
            </li>
            <li className="text-sm hover:text-foreground/80">
              <a href="#">Blog</a>
            </li>
            <li className="text-sm hover:text-foreground/80">
              <a href="#">Forum</a>
            </li>
            <li className="text-sm hover:text-foreground/80">
              <a href="#">Careers</a>
            </li>
          </ul> */}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            onClick={handleSignup}
            className="py-4 rounded-sm bg-white border-zinc-800 border-[1px] text-black hover:bg-white/80 cursor-pointer"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
