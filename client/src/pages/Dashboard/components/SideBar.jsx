import { Home, BookOpen, Trophy, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useSidebarStore } from "@/store/useDashboardStore";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const { activeTab, setActiveTab } = useSidebarStore();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { id: "dash", label: "Dashboard", icon: <Home size={20} /> },
    { id: "analysis", label: "Analysis History", icon: <BookOpen size={20} /> },
    { id: "alerts", label: "Flag & Alerts", icon: <Trophy size={20} />, disabled: true },
    { id: "settings", label: "Settings", icon: <Settings size={20} />, disabled: true },
  ];

  return (
    <aside className="w-64 bg-[#090909] text-white h-screen p-5 flex flex-col border-r border-zinc-900 fixed">
      {/* Logo */}
      <h1 className="text-2xl mb-8 flex gap-2 font-[inter]">
        <div className="h-8 w-8 object-contain">
          <img src="./logo.jpg" alt="logo" className="rounded-md" />
        </div>
        TimmyVision
      </h1>

      {/* Navigation */}
      <nav className="space-y-6 text-sm flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            disabled={item.disabled}
            onClick={() => !item.disabled && setActiveTab(item.id)}
            className={`flex items-center gap-3 w-full text-left font-medium transition-colors 
              ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${activeTab === item.id ? "text-blue-400" : "text-white hover:text-blue-400"}
            `}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="mt-auto">
        <div className="flex items-center justify-between rounded-2xl shadow-md">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user ? user.profilePicture : ""} alt={user ? user.username : "User"} />
              <AvatarFallback>HP</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">{user?.username || ""}</p>
              <p className="text-xs text-gray-400 truncate line-clamp-1 max-w-28">
                {user?.email || ""}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-lg hover:text-red-500 text-white cursor-pointer">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
