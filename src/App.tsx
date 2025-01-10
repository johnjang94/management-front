import { Outlet, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Registration
import RegisterNav from "./components/sign-up/registration-navigation";
import RegisterMain from "./pages/sign-up/main-page";
import RegisterDetail from "./pages/sign-up/detail";

// Verification
import Verification from "./pages/sign-up/verification";
import Verified from "./pages/sign-up/verified";

// Login
import Main from "./pages/login/main";
import Check from "./pages/login/check";

// Password Recovery
import Forgot from "./pages/login/forgot";
import Reset from "./pages/login/reset";
import Confirmation from "./pages/login/confirmation";

// Dashboard
import DashboardHeader from "./components/dashboard/dashboard-header";
import DashboardNav from "./components/dashboard/dashboard-navigation";
import Home from "./pages/dashboard/home/home-index";
import Reserved from "./pages/dashboard/reservations/reserved";
import Guest from "./pages/dashboard/guest/guests";
import Inventory from "./pages/dashboard/inventory/inventory";
import Housekeeping from "./pages/dashboard/house-keeping/house-keeping";
import FinancialPerformance from "./pages/dashboard/reports/reports-index";

// Personalization
import MyAccount from "./pages/my-account/account";
import Settings from "./pages/settings/settings";

interface CustomComponentProps {
  isNavHovered: boolean;
}

function App() {
  const location = useLocation();
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const onToggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const renderContent = (
    navigation: JSX.Element,
    MainComponent: React.ComponentType<Partial<CustomComponentProps>>
  ) => (
    <>
      {navigation}
      <MainComponent isNavHovered={isNavHovered} />
    </>
  );

  const componentsMap: { [key: string]: JSX.Element | null } = {
    "/": isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      renderContent(<RegisterNav />, Main)
    ),
    "/sign-up": isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      renderContent(<RegisterNav />, RegisterMain)
    ),
    "/sign-up_detail": isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      renderContent(<RegisterNav />, RegisterDetail)
    ),
    "/verification": isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      renderContent(<RegisterNav />, Verification)
    ),
    "/verified": isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      renderContent(<RegisterNav />, Verified)
    ),
    "/login": isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      renderContent(<RegisterNav />, Main)
    ),
    "/forgot": renderContent(<RegisterNav />, Forgot),
    "/check": renderContent(<RegisterNav />, Check),
    "/reset": renderContent(<RegisterNav />, Reset),
    "/confirmation": renderContent(<RegisterNav />, Confirmation),
    "/dashboard": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <Home isNavHovered={isNavHovered} name={userName} />
          </div>
        )
      )
    ),
    "/reservations": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <Reserved isNavHovered={isNavHovered} />
          </div>
        )
      )
    ),
    "/settings": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <Settings isNavHovered={isNavHovered} />
          </div>
        )
      )
    ),
    "/account": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <MyAccount
              isNavHovered={isNavHovered}
              setUserName={setUserName}
              userName={userName}
            />
          </div>
        )
      )
    ),
    "/guests": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <Guest />
          </div>
        )
      )
    ),
    "/reports": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <FinancialPerformance isNavHovered={isNavHovered} />
          </div>
        )
      )
    ),
    "/inventory": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <Inventory />
          </div>
        )
      )
    ),
    "/housekeeping": !isAuthenticated ? (
      <Navigate to="/login" />
    ) : (
      renderContent(
        <DashboardHeader onLogout={handleLogout} onToggleNav={onToggleNav} />,
        () => (
          <div className="flex-1 flex">
            {isNavOpen && (
              <DashboardNav
                onHover={setIsNavHovered}
                currentPath={location.pathname}
                ignorePaths={["/settings", "/account", "/help"]}
              />
            )}
            <Housekeeping />
          </div>
        )
      )
    ),
  };

  return <>{componentsMap[location.pathname] || <Outlet />}</>;
}

export default App;
