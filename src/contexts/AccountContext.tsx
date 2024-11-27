import React, { createContext, useState, useEffect, ReactNode } from "react";

import { signInRequest, signUpRequest } from "@/routes/account.routes";
import { User, UserSignIn, UserSignUp } from "@/interfaces/user";

interface AccountContextProps {
  isAuthenticated: boolean;
  user: User | null;
  error: string[];
  errorAnimation: boolean;
  signIn: (values: { email: string; password: string }) => Promise<User | null>;
  signUp: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<User | null>;
  signOut: () => void;
  setError: React.Dispatch<React.SetStateAction<string[]>>;
}

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [errorAnimation, setErrorAnimation] = useState(false);

  const signIn = async (values: UserSignIn): Promise<User | null> => {
    try {
      const user = await signInRequest(values);
      setIsAuthenticated(true);
      setUser(user);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        setError([error.message]);
      } else {
        setError(["An unknown error occurred"]);
      }
      return null;
    }
  };

  const signUp = async (values: UserSignUp): Promise<User | null> => {
    try {
      const user = await signUpRequest(values);
      setIsAuthenticated(true);
      setUser(user);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        setError([error.message]);
      } else {
        setError(["An unknown error occurred"]);
      }
      return null;
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorAnimation(false);
      const animationTimer = setTimeout(() => setErrorAnimation(true), 3000);
      const clearErrorTimer = setTimeout(() => setError([]), 3500); // Adjust timing to match fade-out duration
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(clearErrorTimer);
      };
    }
  }, [error]);

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
        errorAnimation,
        signIn,
        signUp,
        signOut,
        setError,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };
