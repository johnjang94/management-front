import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

// PAGES
import RegisterMain from "./pages/sign-up/main-page.tsx";
import RegisterDetail from "./pages/sign-up/detail.tsx";
import Verification from "./pages/sign-up/verification.tsx";
import Verified from "./pages/sign-up/verified.tsx";
import Main from "./pages/login/main.tsx";

import Forgot from "./pages/login/forgot.tsx";
import Check from "./pages/login/check.tsx";
import Home from "./pages/dashboard/home/home-index.tsx";
import Reset from "./pages/login/reset.tsx";
import Confirmation from "./pages/login/confirmation.tsx";
import MyAccount from "./pages/my-account/account.tsx";
import Settings from "./pages/settings/settings.tsx";
import Reserved from "./pages/dashboard/reservations/reserved.tsx";
import Guest from "./pages/dashboard/guest/guests.tsx";
import Reports from "./pages/dashboard/reports/reports.tsx";
import Inventory from "./pages/dashboard/inventory/inventory.tsx";
import Housekeeping from "./pages/dashboard/house-keeping/house-keeping.tsx";

export const AppWithState = () => {
  const [userName, setUserName] = useState<string>("please change your name");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      // errorElement: <NotFound />,
      children: [
        { index: true, path: "/", element: <Main /> },
        { path: "/sign-up", element: <RegisterMain /> },
        { path: "/sign-up-detail", element: <RegisterDetail /> },
        { path: "/verification", element: <Verification /> },
        { path: "/verified", element: <Verified /> },
        // Login
        { path: "/login", element: <Main /> },
        // Forgot-Password
        { path: "/forgot", element: <Forgot /> },
        { path: "/check", element: <Check /> },
        { path: "/reset", element: <Reset /> },
        { path: "/confirmation", element: <Confirmation /> },
        // Dashboard
        {
          path: "/dashboard",
          element: <Home isNavHovered={false} name={userName} />,
        },
        { path: "/guests", element: <Guest /> },
        { path: "/reports", element: <Reports isNavHovered={false} /> },
        { path: "/inventory", element: <Inventory /> },
        { path: "/housekeeping", element: <Housekeeping /> },
        { path: "/reservations", element: <Reserved isNavHovered={false} /> },

        {
          path: "/account",
          element: (
            <MyAccount
              isNavHovered={false}
              userName={userName}
              setUserName={setUserName}
            />
          ),
        },
        { path: "/settings", element: <Settings isNavHovered={false} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithState />
  </StrictMode>
);
