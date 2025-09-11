import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { useTheme } from "../context/ThemeContext";


export default function MovieList({ movies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleBook = (movie) => {
    if (!bookings.find((m) => m.id === movie.id)) {
      setBookings([...bookings, movie]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const toggleBookings = () => {
    setShowBookings(!showBookings);
  };

  const filteredMovies = (showBookings ? bookings : movies)
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((movie) => {
      if (filterType === "highRating") return movie.vote_average >= 8;
      if (filterType === "recent") return parseInt(movie.release_date) >= 2020;
      return true;
    });

  return (
    <div className="movie-list-container">
       
      <div className="controls">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="highRating">Rating 8+</option>
          <option value="recent">Released after 2020</option>
        </select>

        <button onClick={toggleBookings}>
          {showBookings ? "All Movies" : "My Booking"}
        </button>
      </div>

      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onBook={handleBook} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
