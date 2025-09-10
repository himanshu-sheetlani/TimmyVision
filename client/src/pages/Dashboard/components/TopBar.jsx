import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center bg-[#090909] p-5 border-b border-zinc-900 sticky top-0 z-10 ">
      <h2 className="text-xl font-semibold text-white">
        Welcome Back, Oliver!
      </h2>
      <div className="flex gap-3">
        <Button className="rounded-sm bg-zinc-900">
          <Download /> Download Certificate
        </Button>
        <Button className="bg-blue-600 text-white rounded-sm">
          <Plus /> Add New Course
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
