import { Row } from "reactstrap";
import { FoodReview, user } from "../types";

type Props = {
  review: FoodReview;
  users: user[];
};

export const FoodComment = ({ review, users }: Props) => {
  const user = users.find((user) => user.id === review.reviewerId) as user;
  return (
    <Row>
      <span>{user.login}</span>
      <span>{review.reviewContent}</span>
      <span>{review.reviewTime.toString()}</span>
    </Row>
  );
};
