import { useState } from "react";
import DashboardHeader from "./dashboard-header";
import MobileDashboardNav from "./mobile-navigation";

export default function DashboardContainer() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div className="w-full">
        <DashboardHeader onLogout={() => {}} onToggleNav={toggleNav} />
        <div className="flex-1">
          <h1>Your dashboard content</h1>
        </div>
      </div>
      {isNavOpen && <MobileDashboardNav currentPath="/dashboard" />}
    </div>
  );
}
