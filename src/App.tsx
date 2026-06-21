import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/policies"
          element={
            <ProtectedRoute>
              <Policies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/claims"
          element={
            <ProtectedRoute>
              <Claims />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;