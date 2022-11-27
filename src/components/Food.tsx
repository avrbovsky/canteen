import { useContext, useEffect, useState, FC } from "react";
import { FoodProps } from "../types";
import { Input, Button } from "reactstrap";

export const Food: FC<{
  id: number;
  name: string;
  price: number;
  weight: number;
}> = (props) => {
  const { id, name, price, weight } = props;

  return (
    <>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Weight</th>
        <th>Comment</th>
      </tr>
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>{weight}</td>
        <td>
          <Button>Comment</Button>
        </td>
      </tr>
    </>
  );
};
