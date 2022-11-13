import React, { createContext, useState, useEffect, Dispatch } from "react";
import { user } from "../types";

type context = {
  setCurrentUser: Dispatch<user | undefined>;
  currentUser?: user;
};

export const UserContext = createContext<context>({
  setCurrentUser: () => undefined,
  currentUser: undefined,
});

export const UserProvider = (children: React.ReactNode) => {
  const [currentUser, setCurrentUser] = useState<user | undefined>();
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
