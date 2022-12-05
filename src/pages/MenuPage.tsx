import { useContext, useEffect, useState } from "react";
import { Input, Button, Table } from "reactstrap";
import { url } from "../config";
import { OrderItem } from "../components/OrderItem";
import { UserContext } from "../contexts/UserContext";
import { Food } from "../types";

type AddedFood = {
  id: number;
  amount: number;
  price: number;
};

export const MenuPage = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const { currentUser } = useContext(UserContext);
  const [date, setDate] = useState<Date>(defaultDate);
  const [credit, setCredit] = useState<number>(
    currentUser ? currentUser.accountBalance : 0
  );
  const [menu, setMenu] = useState<Food[]>([]);
  const [addedFoods, setAddedFoods] = useState<AddedFood[]>([]);
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
      fetch(`${url}/api/addCredit`, {
        method: "PUT",
        body: JSON.stringify({
          credit: -total,
          id: [currentUser?.id],
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }).catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    fetch(`${url}/api/menuDetail`, {
      method: "POST",
      body: JSON.stringify({
        date: date.toISOString().split("T")[0],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result: Food[]) => {
        setMenu(result);
      })
      .catch((error) => {
        setError(error);
        console.log("spadol som");
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const fetchMenu = async () => {
    await fetch(`${url}/api/menuDetail`, {
      method: "POST",
      body: JSON.stringify({
        date: date.toISOString().split("T")[0],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result: Food[]) => {
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
        onChange={(e) => {
          setDate(new Date(e.currentTarget.value));
          fetchMenu();
        }}
        required
      ></Input>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((props) => (
            <OrderItem {...props} setTotalPriceOfFood={setTotalPriceOfFood} />
          ))}
        </tbody>
      </Table>
      <h5>Total of order: {total} €</h5>
      <Button onClick={pay}>Pay</Button>
    </div>
  );
};
