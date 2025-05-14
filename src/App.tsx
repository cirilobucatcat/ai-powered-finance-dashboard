import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterAndLogin from './pages/auth/RegisterAndLogin';
import PrivateRoute from './components/PrivateRoute';
import Transaction from './pages/main/Transaction';
import Dashboard from './pages/main/Dashboard';
import { Toaster } from 'react-hot-toast';
import { customToasterProps } from './utils/constants';
import Insights from './pages/main/Insights';

export default function App() {

  return (<AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <PrivateRoute>
              <Insights />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    <Toaster {...customToasterProps} />
  </AuthProvider>);
}
