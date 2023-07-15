import { createContext, useState } from "react";

export type User = {
  ip: string;
};

export type AuthState =
  | { authState: "loading"; user: null }
  | { authState: "not-logged-in"; user: null }
  | { authState: "logged-in"; user: User };

const AuthContext = createContext({
  authState: "loading",
} as AuthState);

export const AuthProvider: React.FC<Element | Element[]> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    authState: "loading",
    user: null,
  });
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
