import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

export const RedirectAuthenticatedUser: React.FC<Props> = ({ children }) => {
  const { token, user } = useAuthStore();

  if (token && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RedirectAuthenticatedUser;
