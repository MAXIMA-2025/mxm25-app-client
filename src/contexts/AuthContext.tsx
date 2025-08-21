import { createContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  isLoggedOut: boolean;
  setIsLoggedOut: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedOut: false,
  setIsLoggedOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedOut, setIsLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
