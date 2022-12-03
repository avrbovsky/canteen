import { useEffect, useState } from "react";
import { url } from "../config";
import { Food, FoodProps } from "../types";

export const useGetFoodList = () => {
  const [foods, setFoods] = useState<FoodProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${url}/api/foodList`)
      .then((response) => response.json())
      .then((result: FoodProps[]) => {
        setFoods(result);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);
  return { foods, isLoading, error };
};
