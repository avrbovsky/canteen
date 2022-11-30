import { useEffect, useState } from "react";
import { url } from "../config";
import { Food, user } from "../types";

export const useGetFoodList = () => {
  const [foods, setFoods] = useState<Food[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${url}/api/foodList`)
      .then((response) => response.json())
      .then((result: Food[]) => {
        setFoods(result);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);
  return { foods, isLoading, error };
};
