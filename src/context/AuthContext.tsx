import { createContext, useContext, useEffect, useState } from "react";
import { setClientToken } from "../services/api";
import { useAuthStore } from "../stores/authStore";
import { Token } from "../types";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const {saveToken, removeToken, token: tokenStore} = useAuthStore((state: Token) => state)

  const login = (token: string) => {
    saveToken(token);
    setToken(token);
  };

  const logout = () => {
    removeToken();
    setToken(null);
  };

  
  useEffect(() => {
    if (!tokenStore) return
    setToken(tokenStore);
  }, [tokenStore])
  
  useEffect(() => {
    setClientToken(token || '');
  }, [token])

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
