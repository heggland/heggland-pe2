import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext([null, () => {}]);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useLocalStorage("auth", null);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
