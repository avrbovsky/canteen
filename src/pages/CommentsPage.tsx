import { useNavigate } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { useGetFoodList } from "../hooks/useGetFoodList";

const dummyFoods = [
  {
    id: 1,
    foodReviews: [],
    menu_id: 1,
    name: "Jedlo",
    price: 3.5,
    weight: 300,
  },
  {
    id: 2,
    foodReviews: [],
    menu_id: 1,
    name: "Jedlo",
    price: 3.5,
    weight: 300,
  },
];

export const CommentsPage = () => {
  // const { foods, isLoading, error } = useGetFoodList();
  const foods = dummyFoods;
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "gray",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h3>Food list</h3>
      <ListGroup>
        {/* {isLoading && (
          <Spinner
            style={{ marginLeft: "auto", marginRight: "auto" }}
            animation="border"
            role="status"
          ></Spinner>
        )} */}
        {foods?.map((food) => {
          return (
            <ListGroupItem
              key={food.id}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "1px 100px",
                alignItems: "center",
              }}
            >
              <span>{food.name}</span>
              <span>{food.price} €</span>
              <Button onClick={() => navigate(`/comments/${food.id}`)}>
                Comments
              </Button>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};
