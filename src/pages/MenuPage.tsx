import { useContext, useState } from "react";
import { Input, Button, Table, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { url } from "../config";
import { UserContext } from "../contexts/UserContext";
import { FoodProps, user } from "../types";
import { OrderItem } from "../components/OrderItem";

type Food = {
  id: number;
  amount: number;
  price: number;
};

export const MenuPage = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const [date, setDate] = useState<Date>(defaultDate);
  const [credit, setCredit] = useState<number>(10);
  const [menu, setMenu] = useState<FoodProps[]>([
    { id: 0, name: "Meat", price: 10, weight: 1000 },
    { id: 1, name: "French fries", price: 10, weight: 1000 },
  ]);
  const [addedFoods, setAddedFoods] = useState<Food[]>([]);
  const [total, setTotal] = useState<number>(0);
  const setTotalPriceOfFood = (id: number, price: number, amount: number) => {
    const foods = addedFoods.filter((food) => food.id !== id);
    const allFoods = [...foods, { id, price, amount }];
    setAddedFoods(allFoods);
    const totalCost = allFoods.reduce(
      (accumulator, food) => accumulator + food.amount * food.price,
      0
    );
    setTotal(totalCost);
  };

  const pay = (): void => {
    if (credit < total) {
      alert("Not enough money");
    } else {
      setCredit((prevState) => prevState - total);
      setTotal(0);
    }
  };

  const fetchMenu = () => {
    fetch(`${url}/api/menu`, {
      method: "POST",
      body: JSON.stringify({
        date: date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          //setMenu(response.json)
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
      <h3>Menu</h3>
      <h4>Your Credit: {credit} €</h4>
      <Input
        type="date"
        name="username"
        placeholder="Enter Username"
        defaultValue={date.toISOString().split("T")[0]}
        onChange={(e) => setDate(new Date(e.currentTarget.value))}
        required
      ></Input>
      <Table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
        {menu &&
          menu.map(({ ...props }) => (
            <OrderItem {...props} setTotalPriceOfFood={setTotalPriceOfFood} />
          ))}
      </Table>
      <h5>Total of order: {total} €</h5>
      <Button onClick={pay}>Pay</Button>
    </div>
  );
};
