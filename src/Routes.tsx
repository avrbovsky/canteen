import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ReceivedMessagesPage } from "./pages/ReceivedMessagesPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SendFilePage } from "./pages/SendFilePage";
import { MenuPage } from "./pages/MenuPage";
import { FoodsPage } from "./pages/FoodsPage";
import { CommentsPage } from "./pages/CommentsPage";
import { FoodCommentsPage } from "./pages/FoodCommentsPage";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/send_file" element={<SendFilePage />} />
      <Route path="/check_messages" element={<ReceivedMessagesPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/foods" element={<FoodsPage />} />
      <Route path="/comments" element={<CommentsPage />} />
      <Route path="comments/:id" element={<FoodCommentsPage />} />
    </RouterRoutes>
  );
};
