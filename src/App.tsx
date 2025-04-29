import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterAndLogin from './pages/auth/RegisterAndLogin';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
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
      </Routes>
    </BrowserRouter>
  </AuthProvider>);
}
