import "./MovieCard.css";

export default function MovieCard({ movie, onBook, theme }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/260x350?text=No+Image";

  return (
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
      </div>
    </div>
  );
}

