import { useNavigate } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { useGetFoodList } from "../hooks/useGetFoodList";

export const CommentsPage = () => {
  const { foods, loading, error } = useGetFoodList();
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
        {loading && (
          <Spinner
            style={{ marginLeft: "auto", marginRight: "auto" }}
            animation="border"
            role="status"
          ></Spinner>
        )}
        {foods.map((food) => {
          return (
            <ListGroupItem>
              <Col>{food.name}</Col>
              <Col>{food.price} €</Col>
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
