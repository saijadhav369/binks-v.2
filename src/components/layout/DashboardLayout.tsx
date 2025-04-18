
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0F0F0F]">
        <Sidebar />
        <main className="flex-1 overflow-auto pl-[280px] lg:pl-20"> {/* Added padding to account for sidebar width */}
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
