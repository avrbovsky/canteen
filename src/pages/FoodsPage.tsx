import { useContext, useState } from "react";
import { Input, Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { url } from "../config";
import { UserContext } from "../contexts/UserContext";
import { FoodProps, user } from "../types";
import { OrderItem } from "../components/OrderItem";
import { Food } from "../components/Food";



export const FoodsPage = () => {
  const FOODS: FoodProps[] = [
    { id: 0, name: "Meat", price: 10, weight: 1000 },
    { id: 1, name: "French fries", price: 10, weight: 1000 },
  ];
  const [name, setName] = useState('');
  const [foods, setFoods] = useState<FoodProps[]>(FOODS)
  const navigate = useNavigate();
  

  const filter = (keyword: string): void => {

    if (keyword !== '') {
      const results = FOODS.filter((food) => {
        return food.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoods(results);
    } else {
      setFoods(FOODS);
      // If the text field is empty, show all foods
    }

    setName(keyword);
  };

  const fetchFoods = () => {
    fetch(`${url}/api/foods`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          //FOODS = response.json
        }
      })
      .catch((error) => console.log("error", error));
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
        onChange={(e) => {filter(e.target.value)}}
        placeholder="Filter"
      ></Input>
      <Table>
        {foods && foods.length > 0 ? (
          foods.map(({ id, name, price, weight }) => (
            <Food
              id={id}
              name={name}
              price={price}
              weight={weight}
            />
          ))): (
            <h1>No results found!</h1>
          )
        }
      </Table>
    </div>
  );
};
