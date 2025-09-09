import {
  Home,
  BookOpen,
  Users,
  Star,
  Trophy,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <aside className="w-64 bg-[#090909] text-white h-screen p-5 flex flex-col border-r-[1px] border-zinc-900 fixed">
      {/* Logo */}
      <h1 className="text-2xl mb-8 flex gap-2">
        <div className="h-8 w-8 object-contain">
          <img src="./logo.jpg" alt="" className="rounded-md" />
        </div>
        TimmyVision
      </h1>

      {/* Navigation */}
      <nav className="space-y-6 text-sm flex-1">
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <Home size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <BookOpen size={20} /> Image Analysis
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <Users size={20} /> Video Analysis
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <Star size={20} /> Text Analysis
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <Trophy size={20} /> Flag & Alerts
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <Settings size={20} /> Settings
        </a>
      </nav>

      {/* Profile Section (sticks at bottom) */}
      <div className="mt-auto">
        <div className="flex items-center justify-between rounded-2xl shadow-md">
          {/* Avatar + User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user ? user.profilePicture : ""}
                alt="Harshit Parmar"
              />
              <AvatarFallback>HP</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white ">
                {user ? user.username : ""}
              </p>
              <p className="text-xs text-gray-400 truncate line-clamp-1 max-w-28">
                {user ? user.email : ""}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg  hover:text-red-500 text-white cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
