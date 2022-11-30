import { FC } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  price: number;
  weight: number;
};

export const Food: FC<Props> = ({ id, name, price, weight }: Props) => {
  const navigate = useNavigate();

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
          <Button onClick={() => navigate(`/detail/${id}`)}>Comment</Button>
        </td>
      </tr>
    </>
  );
};
