import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    todayTickets: 0,
    todayRevenue: 0,
    totalTickets: 0,
    totalRevenue: 0,
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const snapshot = await getDocs(collection(db, "bookings"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);

        const today = new Date().toISOString().split("T")[0];

        let todayTickets = 0;
        let todayRevenue = 0;
        let totalTickets = 0;
        let totalRevenue = 0;

        data.forEach((booking) => {
          const seats = Number(booking.seats || 0);
          const price = Number(booking.pricePerSeat || 120); // fallback if missing
          const revenue = seats * price;

          totalTickets += seats;
          totalRevenue += revenue;

          if (booking.date === today) {
            todayTickets += seats;
            todayRevenue += revenue;
          }
        });

        setStats({
          todayTickets,
          todayRevenue,
          totalTickets,
          totalRevenue,
        });
      } catch (err) {
        console.error("Error loading bookings:", err);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className={`admin-dashboard ${theme}`}>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>


      <h2>All Bookings</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>🎟️ Tickets Sold Today</h4>
          <p>{stats.todayTickets}</p>
        </div>
        <div className="stat-card">
          <h4>💰 Today's Collection</h4>
          <p>₹ {stats.todayRevenue}</p>
        </div>
        <div className="stat-card">
          <h4>📊 Total Tickets Sold</h4>
          <p>{stats.totalTickets}</p>
        </div>
        <div className="stat-card">
          <h4>💼 Total Collection</h4>
          <p>₹ {stats.totalRevenue}</p>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Movie</th>
            <th>User</th>
            <th>Seats</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.userName}</td>
              <td>{b.seats}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

