import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { DecryptPage } from "./pages/DecryptPage";
import { EncryptPage } from "./pages/EncryptPage";
import { GetKeyPage } from "./pages/GetKeyPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ReceivedMessagesPage } from "./pages/ReceivedMessagesPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SendFilePage } from "./pages/SendFilePage";
import { MenuPage } from "./pages/MenuPage";
import { FoodsPage } from "./pages/FoodsPage";
import { CommentsPage } from "./pages/CommentsPage";
import { AddMenuPage } from "./pages/AddMenuPage";
import { AddFoodPage } from "./pages/AddFoodPage";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<Navigate to="/login" />} />
      {/* <Route path="/get-key" element={<GetKeyPage />} /> */}
      {/* <Route path="/encrypt" element={<EncryptPage />} /> */}
      {/* <Route path="/decrypt" element={<DecryptPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/send_file" element={<SendFilePage />} />
      <Route path="/check_messages" element={<ReceivedMessagesPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/foods" element={<FoodsPage />} />
      <Route path="/commets" element={<CommentsPage />} />
      <Route path="/addFood" element={<AddFoodPage/>}/>
      <Route path="/addMenu" element={<AddMenuPage />} />
    </RouterRoutes>
  );
};
