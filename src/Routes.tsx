import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { DecryptPage } from './pages/DecryptPage';
import { EncryptPage } from './pages/EncryptPage';
import { GetKeyPage } from './pages/GetKeyPage';
import { HomePage } from './pages/HomePage';


export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<HomePage />} />
      <Route path="/get-key" element={<GetKeyPage />} />
      <Route path="/encrypt" element={<EncryptPage />} />
      <Route path="/decrypt" element={<DecryptPage />} />
    </RouterRoutes>
  );
};