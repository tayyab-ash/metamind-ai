import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Activity, MessageSquare, BarChart2, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, isActive, onClick }) => (
  <Link to={to} onClick={onClick}>
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className="w-full flex gap-2 justify-start"
    >
      <Icon className="h-5 w-5" /> 
      {label}
    </Button>
  </Link>
);

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const sidebarItems = [
    { icon: Home, label: 'Home', to: '/' },
    { icon: Activity, label: 'Simulation', to: '/simulation' },
    { icon: MessageSquare, label: 'Feedback', to: '/feedback' },
    { icon: BarChart2, label: 'Reports', to: '/reports' },
  ];

  return (
    <div className="relative">
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 z-50 h-screen bg-teal-700 shadow-lg text-white transition-transform duration-300",
        collapsed ? "translate-x-full" : "translate-x-0",
        "w-64"
      )}>
        <div className="flex items-center justify-start p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(true)}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight />
          </Button>
        </div>
        <nav className="flex flex-col gap-4 px-2">
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              {...item} 
              isActive={location.pathname === item.to}
              onClick={() => setCollapsed(true)}
            />
          ))}
        </nav>
      </div>

      {/* Menu Icon */}
      <div className="fixed top-4 right-4">
        {collapsed && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(false)}
            className="text-white mt-2 bg-black/30  h-10 w-10 rounded-md hover:bg-white/80 hover:text-teal-900 "
          >
            <Menu className='h-8 w-8 ' />
          </Button>
        )}
      </div>
    </div>
  );
}
