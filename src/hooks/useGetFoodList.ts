import { useEffect, useState } from "react";
import { url } from "../config";
import { Food, user } from "../types";

export const useGetFoodList = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${url}/api/foodList`)
      .then((response) => response.json())
      .then((result: Food[]) => {
        setFoods(result);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return { foods, loading, error };
};