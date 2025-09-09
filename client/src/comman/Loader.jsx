import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full h-screen bg-[#090909] flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-white animate-spin" />
    </div>
  );
};

export default Loader;
