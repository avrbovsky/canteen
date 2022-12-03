import { useContext, useEffect, useState } from "react";
import { Input, Button, Table } from "reactstrap";
import { url } from "../config";
import { FoodProps, user } from "../types";
import { OrderItem } from "../components/OrderItem";
import { UserContext } from "../contexts/UserContext";

type Food = {
  id: number;
  amount: number;
  price: number;
};

export const MenuPage = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [date, setDate] = useState<Date>(defaultDate);
  const [credit, setCredit] = useState<number>(currentUser == undefined ? 0 : currentUser.accountBalance);
  const [menu, setMenu] = useState<FoodProps[]>();
  const [addedFoods, setAddedFoods] = useState<Food[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();


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


  useEffect(() => {
    fetch(`${url}/api/menu`, {
        method: "POST",
        body: JSON.stringify({
          date: date,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => response.json())
      .then((result: FoodProps[]) => {
        setMenu(result);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  
  const fetchMenu = async () => {
    await fetch(`${url}/api/menu`, {
      method: "POST",
      body: JSON.stringify({
        date: date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((result: FoodProps[]) => {
      setMenu(result);
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
        defaultValue={date.toISOString().split("T")[0]}
        onChange={(e) => {setDate(new Date(e.currentTarget.value));fetchMenu();}}
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
            <OrderItem {...props} />
          ))}
      </Table>
      <h5>Total of order: {total} €</h5>
      <Button onClick={pay}>Pay</Button>
    </div>
  );
};
