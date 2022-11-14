import { createContext, useState, Dispatch, ReactNode } from "react";
import { user } from "../types";

type context = {
  setCurrentUser: Dispatch<user | undefined>;
  currentUser?: user;
};

export const UserContext = createContext<context>({
  setCurrentUser: () => undefined,
  currentUser: undefined,
});

type Props = {
  children: JSX.Element;
};

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<user | undefined>();
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
