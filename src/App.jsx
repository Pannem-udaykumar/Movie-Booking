import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navigate } from "react-router-dom";
import { isAdmin } from "./Services/adminService";
import { useEffect, useState } from "react";
import { useAuth } from './context/AuthContext';




function AdminRoute({ children }) {
  const { user } = useAuth();
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const check = async () => {
      if (user?.email) {
        const admin = await isAdmin(user.email);
        setAllowed(admin);
      } else {
        setAllowed(false);
      }
    };
    check();
  }, [user]);

  if (allowed === null) return <p>Loading...</p>;
  if (!allowed) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
       <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={
            <AdminRoute>
            <AdminDashboard />
            </AdminRoute>} />
        </Routes>
      </Router>
      </ThemeProvider>
      
    </AuthProvider>
  );
}

