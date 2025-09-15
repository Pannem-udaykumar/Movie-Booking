import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginWithGoogle, logout } from "../auth/firebase";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import FilterDropdown from "./FilterDropdown";
import { useTheme } from "../context/ThemeContext";
import { isAdmin } from "../Services/adminService";


export default function Navbar({ onFilterChange, onSearch }) {
  const [query, setQuery] = useState("");
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isAdminUser, setIsAdminUser] = useState(false);



  useEffect(() => {
    
    const checkAdmin = async () => {
      if (user?.email) {
        const isAdminEmail = await isAdmin(user.email);
        setIsAdminUser(isAdminEmail);
      } else {
        setIsAdminUser(false);
      }
    };
    checkAdmin();
  }, [user]);

  

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  
  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <nav className="navbar">
      <img
        src="https://img.icons8.com/fluency/96/movie.png"
        alt="Movie Icon"
        style={{ width: 40, height: 40 }}
      />

      <h3 class="heading">Welcome to Movie Explorer</h3>

      <div className="navbar-left">
        <Link to="/" className="logo" />
        
      </div>

      <div
        className="navbar-right"
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="search-bar"
          style={{ display: "flex" }}
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          
        </form>

        <FilterDropdown onFilterChange={onFilterChange} />

        <button onClick={toggleTheme} className="btn btn-theme-toggle">
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user ? (
          <div
            className="auth-info"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <img
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=random`
              }
              alt={user.displayName || "User"}
              className="user-avatar"
            />

            <span>{user.displayName}</span>
            {isAdminUser && <Link to="/admin" className="btn btn-admin">Admin Dashboard</Link>}



            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* Two login buttons */}
            <button onClick={handleLogin} className="btn btn-login">
              Login as User/Admin
            </button>
            <small style={{ color: "white", fontSize: "0.8rem" }}>

            </small>
          </>
        )}
      </div>
    </nav>
  );
}


