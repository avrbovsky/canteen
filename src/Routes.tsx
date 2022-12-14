import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ReceivedMessagesPage } from "./pages/ReceivedMessagesPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SendFilePage } from "./pages/SendFilePage";
import { MenuPage } from "./pages/MenuPage";
import { FoodsPage } from "./pages/FoodsPage";
import { FoodCommentsPage } from "./pages/FoodCommentsPage";
import { AddMenuPage } from "./pages/AddMenuPage";
import { AddFoodPage } from "./pages/AddFoodPage";
import { AddCreditPage } from "./pages/AddCreditPage";

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
      <Route path="detail/:id" element={<FoodCommentsPage />} />
      <Route path="/addFood" element={<AddFoodPage />} />
      <Route path="/addMenu" element={<AddMenuPage />} />
      <Route path="/addCredit" element={<AddCreditPage />} />
    </RouterRoutes>
  );
};
