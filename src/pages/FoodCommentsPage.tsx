import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { FoodComment } from "../components/FoodComment";
import { url } from "../config";
import { Food, FoodReview } from "../types";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Col, Input, Row } from "reactstrap";
import { UserContext } from "../contexts/UserContext";
import { useGetUsers } from "../hooks/useGetUsers";
import { useGetFoodList } from "../hooks/useGetFoodList";

const reviews: FoodReview[] = [
  {
    id: 1,
    food_id: 1,
    reviewContent: "Mnam dopici",
    reviewerId: 1,
    reviewTime: new Date(),
  },
  {
    id: 2,
    food_id: 1,
    reviewContent: "Tyy kokot",
    reviewerId: 2,
    reviewTime: new Date(),
  },
  {
    id: 3,
    food_id: 1,
    reviewContent: "Fuj",
    reviewerId: 1,
    reviewTime: new Date(),
  },
];

const dummyFood: Food = {
  id: 1,
  foodReviews: reviews,
  menu_id: 1,
  name: "Jedlo",
  price: 3.5,
  weight: 300,
};

export const FoodCommentsPage = () => {
  const { foods, isLoading } = useGetFoodList();
  const [food, setFood] = useState<Food>(dummyFood);
  const { users } = useGetUsers();
  const { currentUser } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState<string>("");
  const { id } = useParams();
  const [addingComment, setAddingComment] = useState<boolean>(false);

  const handleAddComment = () => {
    setAddingComment(true);
    fetch(`${url}/api/reviewCreate`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser!.id,
        foodId: food,
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
      <h3>Food "{food?.name}" comments</h3>
      {!food?.foodReviews.length && <span>THERE ARE NO COMMENTS YET</span>}
      {food?.foodReviews.map((review) => {
        return <FoodComment review={review} users={users} key={review.id} />;
      })}
      <h4>Add comment</h4>
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
