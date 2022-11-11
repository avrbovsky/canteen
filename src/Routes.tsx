import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { DecryptPage } from './pages/DecryptPage';
import { EncryptPage } from './pages/EncryptPage';
import { GetKeyPage } from './pages/GetKeyPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';


export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<HomePage />} />
      <Route path="/get-key" element={<GetKeyPage />} />
      <Route path="/encrypt" element={<EncryptPage />} />
      <Route path="/decrypt" element={<DecryptPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </RouterRoutes>
  );
};