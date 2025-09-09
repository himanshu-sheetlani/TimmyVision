import React from "react";
import Sidebar from "./components/SideBar";
import Topbar from "./components/TopBar";
import Dash from "./components/Dash";



const Dashboard = () => {
  return (
    <div className="flex bg-[#090909] min-h-screen text-white">
      {/* Sidebar (fixed left) */}
      <Sidebar />

      {/* Main Section */}
      <main className="flex-1 ml-64">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <Dash/>       
      </main>
    </div>
  );
};

export default Dashboard;
