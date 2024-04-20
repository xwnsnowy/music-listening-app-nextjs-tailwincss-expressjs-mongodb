"use client";

import { AuthContext } from "@/context/AuthContext";
import { getAccessToken } from "@/utils/Helpers";
import { deleteCookie } from "cookies-next";
import { useState } from "react";

interface User {
  _id: string;
  email: string;
  password: string;
  dob?: {
    day: string;
    month: string;
    year: string;
  };
  gender?:
    | "male"
    | "female"
    | "non-binary"
    | "something-else"
    | "prefer-not-to-say";
  role: "member" | "admin" | "guest";
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  refreshToken?: string | null;
}

interface AccessToken {
  accessToken: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessToken()
  );

  const login = (userData: User, accessToken: AccessToken) => {
    setUser(userData);
    setAccessToken(accessToken.accessToken);
  };

  const logout = () => {
    // Xóa user và accessToken từ state
    setUser(null);
    setAccessToken(null);

    // Xóa TokenHeaderPayload từ Local Storage
    localStorage.removeItem("accessTokenHeaderPayload");

    // Xóa TokenSignature từ Cookie Next
    deleteCookie("accessTokenSignature");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};