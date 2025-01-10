import { Navigate, Outlet } from "react-router-dom";
import RegisterNav from "../components/sign-up/registration-navigation";

interface AuthLayoutProps {
  isAuthenticated: boolean;
}

export const AuthLayout = ({ isAuthenticated }: AuthLayoutProps) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <RegisterNav />
      <Outlet />
    </>
  );
};
