import { useContext, useEffect, useState, FC } from "react";
import { FoodProps } from "../types";
import { Input, Button } from "reactstrap";

export const OrderItem: FC<FoodProps> = (props) => {
  const { id, name, price, weight, setTotalPriceOfFood } = props;
  const [amount, setAmount] = useState<number>(0);
  const changeAmount = (num: number) => {
    if (num == -1 && amount == 0) {
    } else {
      setAmount((prevState) => prevState + num);
      setTotalPriceOfFood?.(id, price, num);
    }
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>{weight}</td>
        <td>
          <Button
            onClick={(e) => {
              changeAmount(1);
            }}
          >
            +
          </Button>
          {amount}
          <Button
            onClick={(e) => {
              changeAmount(-1);
            }}
          >
            -
          </Button>
        </td>
        <td>{price * amount} €</td>
      </tr>
    </>
  );
};
