import React from "react";
import Sidebar from "./components/SideBar";
import Topbar from "./components/TopBar";
import Dash from "./components/Dash_Tab";
import Analysis from "./components/Analysis";
import { useSidebarStore } from "@/store/useDashboardStore";

const Dashboard = () => {
  const { activeTab } = useSidebarStore();

  return (
    <div className="flex bg-[#090909] min-h-screen text-white">
      {/* Sidebar (fixed left) */}
      <Sidebar />

      {/* Main Section */}
      <main className="flex-1 ml-64">
        {/* Topbar */}
        <Topbar />

        {/* Render tab content dynamically */}
        <div className="p-6">
          {activeTab === "dash" && <Dash />}
          {activeTab === "analysis" && <Analysis />}
          {activeTab === "alerts" && (
            <div className="text-gray-400">🚧 Alerts feature coming soon...</div>
          )}
          {activeTab === "settings" && (
            <div className="text-gray-400">⚙️ Settings feature coming soon...</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
