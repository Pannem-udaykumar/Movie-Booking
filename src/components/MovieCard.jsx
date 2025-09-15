import "./MovieCard.css";
import { useState } from "react";
import { getMovieTrailer } from "../api/tmdb";

export default function MovieCard({ movie, onBook, theme }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/260x350?text=No+Image";

  const handleWatchTrailer = async () => {
    const key = await getMovieTrailer(movie.id);
    if (key) {
      setTrailerKey(key);
      setShowTrailer(true);
    } else {
      alert("Trailer not available");
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerKey(null);
  };

  return (
    <>
      <div className={`movie-card ${theme}`}>
        <img className="movie-poster" src={poster} alt={movie.title} />
        <div className="movie-info">
          <h2 className="movie-title" title={movie.title}>
            {movie.title}
          </h2>
          <p className="movie-meta">
            ⭐ {movie.vote_average} &nbsp;|&nbsp; 📅 {movie.release_date}
          </p>
        </div>
        <div className="movie-actions">
          <button className="book-button" onClick={() => onBook(movie)}>
            Book Now
          </button>
          <button
            className="book-button"
            onClick={handleWatchTrailer}
            style={{ backgroundColor: "#b55718ff", marginLeft: "8px" }}
          >
            Watch Trailer
          </button>
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div className="booking-modal-overlay" onClick={closeTrailer}>
          <div
            className="booking-modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px", width: "90%" }}
          >
            <div className="modal-title">
              {movie.title} - Trailer
            </div>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="modal-actions">
              <button className="btn btn-logout" onClick={closeTrailer}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
