import { Button } from "@/components/ui/button";
import { HelpCircle, BellDot } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const Topbar = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex justify-between items-center bg-[#090909] p-5 border-b border-zinc-900 sticky top-0 z-10 ">
      <h2 className="text-xl font-semibold text-white">
        Welcome Back, {user?.username}!
      </h2>

      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-sm bg-zinc-900">
              <BellDot />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#121212] text-white border border-zinc-800 min-h-[200px]">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>
                Here are your latest notifications.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <h1 className="text-center">No Notifications</h1>
            </div>
          </DialogContent>
        </Dialog>

        {/* Support button */}
        <Button className="bg-blue-600 text-white rounded-sm">
          <HelpCircle /> Support
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
