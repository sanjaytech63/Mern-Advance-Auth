import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { token, user } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
