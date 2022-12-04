export type message = {
  id: number;
  fileName: string;
  receiverId: number;
  senderId: number;
  sentTime: Date;
};

export type loginAttempt = {
  attempt_id: number;
  time_of_attempt: Date;
  user_id: number;
};

export type user = {
  id: number;
  isManager: boolean;
  login: string;
  password: string;
  salt: string;
  accountBalance : number;
  publicKey: string;
  privateKey: string;
  receivedMessages: message[];
  sentMessages: message[];
  userLoginAttempts: loginAttempt[];
};

export type FoodReview = {
  reviewId: number;
  reviewerId: number;
  food_id: number;
  reviewContent: string;
  reviewTime: Date;
};

export type Food = {
  id: number;
  name: string;
  price: number;
  weight: number;
  menu_id: number[];
  foodReviews: FoodReview[];
};

export type FoodProps = {
  priceOfOrderedFood?: number;
  setTotalPriceOfFood?: (
    id: number,
    price: number,
    amountChange: number
  ) => void;
  amount?: number;
} & Omit<Food, "menu_id" | "foodReviews">;

export type option = {
  value: number;
  label: string;
};
