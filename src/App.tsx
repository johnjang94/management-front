import { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

import { AuthLayout } from "./layouts/auth-layout";
import { DashboardLayout } from "./layouts/dashboard-layout";
import Main from "./pages/login/main";
// Registration
import RegisterMain from "./pages/sign-up/main-page";
import RegisterDetail from "./pages/sign-up/detail";
// Verification
import Verification from "./pages/sign-up/verification";
import Verified from "./pages/sign-up/verified";
// Password Change
import Forgot from "./pages/login/forgot";
import Check from "./pages/login/check";
import Reset from "./pages/login/reset";
// Change Confirmation
import Confirmation from "./pages/login/confirmation";
// Dashboard
import Home from "./pages/dashboard/home/home-index";
import Reserved from "./pages/dashboard/reservations/reserved";
import Guest from "./pages/dashboard/guest/guests";
import FinancialPerformance from "./pages/dashboard/reports/reports-index";
import Inventory from "./pages/dashboard/inventory/inventory";
import Housekeeping from "./pages/dashboard/house-keeping/house-keeping";
import MyAccount from "./pages/my-account/account";
// Personalization
import Settings from "./pages/settings/settings";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route element={<AuthLayout isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<RegisterMain />} />
        <Route path="/sign-up_detail" element={<RegisterDetail />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/login" element={<Main />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/check" element={<Check />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Route>

      <Route
        element={
          <DashboardLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        }
      >
        <Route
          path="/dashboard"
          element={<Home name={userName} isNavHovered={false} />}
        />
        <Route
          path="/reservations"
          element={<Reserved isNavHovered={false} />}
        />
        <Route path="/guests" element={<Guest />} />
        <Route path="/reports" element={<FinancialPerformance />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/housekeeping" element={<Housekeeping />} />
        <Route
          path="/account"
          element={
            <MyAccount
              userName={userName}
              setUserName={setUserName}
              isNavHovered={false}
            />
          }
        />
        <Route path="/settings" element={<Settings isNavHovered={false} />} />
      </Route>
    </Routes>
  );
}

export default App;
