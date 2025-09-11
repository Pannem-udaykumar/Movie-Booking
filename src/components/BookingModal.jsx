
import { useState } from "react";
import { createBooking } from "../Services/bookingService";
import { useAuth } from "../context/AuthContext";
import "./BookingModal.css";

export default function BookingModal({ movie, onClose }) {
  const { user } = useAuth();

  const MAX_SEATS = 5;
  const MIN_SEATS = 1;
  

  const [seats, setSeats] = useState("1");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const incrementSeats = () => {
    const num = parseInt(seats);
    if (!Number.isNaN(num) && num < MAX_SEATS) {
      setSeats((num + 1).toString());
    }
  };

  const decrementSeats = () => {
    const num = parseInt(seats);
    if (!Number.isNaN(num) && num > MIN_SEATS) {
      setSeats((num - 1).toString());
    }
  };

  const handleBooking = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const numSeats = parseInt(seats);
    if (!numSeats || numSeats < MIN_SEATS || numSeats > MAX_SEATS) {
      alert(`You can only book between ${MIN_SEATS} and ${MAX_SEATS} tickets.`);
      return;
    }

    if (!date || !time) {
      alert("Please select a valid date and time.");
      return;
    }

    setLoading(true);

    try {
      await createBooking({
        movieId: movie.id,
        title: movie.title,
        userId: user.uid,
        userName: user.displayName || user.email,
        seats,
        date,
        time,
      });

      alert("✅ Booking confirmed!");
      onClose();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Book: {movie.title}</h2>

        <label>Number of Seats:</label>
        <input
          type="number"
          min={MIN_SEATS}
          max={MAX_SEATS}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="input"
        />

        <div className="seat-buttons">
          <button onClick={decrementSeats} disabled={seats <= MIN_SEATS}>
            -
          </button>
          <button onClick={incrementSeats} disabled={seats >= MAX_SEATS}>
            +
          </button>
        </div>

        <label>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />

        <label>Select Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input"
        />

        <div className="modal-actions">
          <button onClick={onClose} disabled={loading} className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={handleBooking}
            disabled={loading}
            className="confirm-btn"
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}


