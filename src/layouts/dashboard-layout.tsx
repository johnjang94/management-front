import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import DashboardHeader from "../components/dashboard/dashboard-header";
import DashboardNav from "../components/dashboard/dashboard-navigation";

interface DashboardLayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const DashboardLayout = ({
  isAuthenticated,
  onLogout,
}: DashboardLayoutProps) => {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const onToggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-[3.75rem]">
        {" "}
        {/* Height matches header's content */}
        <DashboardHeader onLogout={onLogout} onToggleNav={onToggleNav} />
      </div>
      <div className="flex-1 flex">
        {isNavOpen && (
          <aside className="fixed left-0 top-[3.75rem] h-[calc(100vh-3.75rem)]">
            <DashboardNav
              onHover={setIsNavHovered}
              currentPath={location.pathname}
              ignorePaths={["/settings", "/account", "/help"]}
            />
          </aside>
        )}
        <main
          className={`
            flex-1 
            ${isNavHovered ? "ml-40" : "ml-14"} 
            transition-all 
            duration-300
            bg-gray-50
          `}
        >
          <Outlet context={{ isNavHovered }} />
        </main>
      </div>
    </div>
  );
};
