import { useEffect, useState } from "react";
import { Input, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { url } from "../config";
import { FoodProps } from "../types";
import { Food } from "../components/Food";
import { useGetFoodList } from "../hooks/useGetFoodList";

export const FoodsPage = () => {
  //const foods: FoodProps[] = [{ id: 0, name: "Meat", price: 10, weight: 1000 },{ id: 1, name: "French fries", price: 10, weight: 1000 },];
  const [foods,setFoods] = useState<FoodProps[]>();

  const [name, setName] = useState("");
  const [foodsFiltered, setFoodsFiltered] = useState<FoodProps[]>();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${url}/api/foodList`)
    .then((response) => response.json())
    .then((result: FoodProps[]) => {
      setFoodsFiltered(result);
      setFoods(result)
    })
    .catch((error) => console.log("error", error))
  }, []);

  const filter = (keyword: string): void => {
    if (keyword !== "") {
      const results = foods?.filter((food) => {
        return food.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoodsFiltered(results);
    } else {
      setFoodsFiltered(foods);
      // If the text field is empty, show all foods
    }

    setName(keyword);
  };

  return (
    <div
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h3>Foods</h3>
      <Input
        type="search"
        value={name}
        onChange={(e) => {
          filter(e.target.value);
        }}
        placeholder="Filter"
      ></Input>
      <Table>
        {foodsFiltered && foodsFiltered.length > 0 ? (
          foodsFiltered.map(({ id, name, price, weight }) => (
            <Food id={id} name={name} price={price} weight={weight} />
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </Table>
    </div>
  );
};
