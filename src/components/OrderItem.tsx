import { useState, FC } from "react";
import { FoodProps } from "../types";
import { Input } from "reactstrap";

export const OrderItem: FC<FoodProps> = ({
  id,
  name,
  price,
  weight,
  setTotalPriceOfFood,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const changeAmount = (num: string) => {
    const amount = +num;
    if (amount >= 0) {
      setAmount(amount);
      setTotalPriceOfFood?.(id, price, amount);
    }
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>{weight}</td>
        <td>
          <Input
            onChange={(e) => changeAmount(e.currentTarget.value)}
            value={amount}
            type="number"
          />
        </td>
        <td>{price * amount} €</td>
      </tr>
    </>
  );
};
