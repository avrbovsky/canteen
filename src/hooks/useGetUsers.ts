import { useEffect, useState } from "react";
import { url } from "../config";
import { user } from "../types";

export const useGetUsers = () => {
  const [users, setUsers] = useState<user[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${url}/api/user`)
      .then((response) => response.json())
      .then((result: user[]) => {
        setUsers(result);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { users, isLoading, error };
};
