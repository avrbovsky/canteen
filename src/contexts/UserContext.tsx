import { createContext, useState, Dispatch, ReactNode } from "react";
import { user } from "../types";

type context = {
  setCurrentUser: Dispatch<user | undefined>;
  currentUser?: user;
};

export const UserContext = createContext<context>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

type Props = {
  children: JSX.Element;
};

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<user | undefined>();

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
