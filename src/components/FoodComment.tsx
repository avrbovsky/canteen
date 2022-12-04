import { Row } from "reactstrap";
import { FoodReview, user } from "../types";
import { AiOutlineClockCircle } from "react-icons/ai";

type Props = {
  review: FoodReview;
  users?: user[];
};

export const FoodComment = ({ review, users }: Props) => {
  const user = users?.find((user) => user.id === review.reviewerId);
  return (
    <Row
      xs="3"
      style={{ backgroundColor: "lightgray", borderRadius: 10, margin: 5 }}
    >
      <span>{user?.login}</span>
      <span>{review.reviewContent}</span>
      <span>
        {review.reviewTime.split("T")[0]} <AiOutlineClockCircle />
      </span>
    </Row>
  );
};
