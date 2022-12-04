import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FoodComment } from "../components/FoodComment";
import { url } from "../config";
import { Food, FoodReview } from "../types";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Col, Input, Row, Table } from "reactstrap";
import { UserContext } from "../contexts/UserContext";
import { useGetUsers } from "../hooks/useGetUsers";
import { useGetFoodList } from "../hooks/useGetFoodList";

const reviews: FoodReview[] = [
  {
    reviewId: 1,
    food_id: 1,
    reviewContent: "Mnam",
    reviewerId: 1,
    reviewTime: new Date(),
  },
  {
    reviewId: 2,
    food_id: 1,
    reviewContent: "Wau",
    reviewerId: 2,
    reviewTime: new Date(),
  },
  {
    reviewId: 3,
    food_id: 1,
    reviewContent: "Fuj",
    reviewerId: 1,
    reviewTime: new Date(),
  },
];

const dummyFood: Food = {
  id: 1,
  foodReviews: reviews,
  menu_id: [1],
  name: "Jedlo",
  price: 3.5,
  weight: 300,
};

export const FoodCommentsPage = () => {
  //const { foods, isLoading } = useGetFoodList();
  const params = useParams().id;
  const [food, setFood] = useState<Food| undefined>();
  const { users } = useGetUsers();
  const { currentUser } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState<string>("");
  const { id } = useParams();
  const [addingComment, setAddingComment] = useState<boolean>(false);


  useEffect(() => {
    fetch(`${url}/api/foodId/${params}`)
      .then((response) => response.json())
      .then((result: Food) => {
        setFood(result);
      })
      .catch((error) => console.log("error", error))
  }, []);

  const handleAddComment = () => {
    setAddingComment(true);
    fetch(`${url}/api/reviewCreate`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser!.id,
        foodId: food?.id,
        reviewContent: commentContent,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          setCommentContent("");
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setAddingComment(false));
  };

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
      <h3>"{food?.name}" detail</h3>
      <Table style={{ backgroundColor: "lightgray" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Weight</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { food&&
          <tr>
            <td># {food?.id}</td>
            <td>{food?.weight} g</td>
            <td>{food?.price} €</td>
          </tr>
          }
        </tbody>
      </Table>
      <h3>Comments</h3>
      {!food?.foodReviews.length && <span>THERE ARE NO COMMENTS YET</span>}
      {food?.foodReviews.map((review) => {
        return <FoodComment review={review} users={users} key={review.reviewId} />;
      })}
      <h5>Add comment</h5>
      <Row>
        <Col xs="11">
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.currentTarget.value)}
          />
        </Col>
        <Col>
          <Button onClick={handleAddComment} disabled={addingComment}>
            <AiFillPlusCircle />
          </Button>
        </Col>
      </Row>
    </div>
  );
};
