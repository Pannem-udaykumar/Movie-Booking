import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import BookingModal from "../components/BookingModal";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    language: "",
    rating: "",
  });
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let endpoint = "";
        let params = { page: currentPage };

        if (searchQuery) {
          endpoint = "/search/movie";
          params.query = searchQuery;
        } else {
          endpoint = "/discover/movie";
          if (filters.genre) params.with_genres = filters.genre;
          if (filters.language) params.with_original_language = filters.language;
          if (filters.rating) params["vote_average.gte"] = filters.rating;
        }

        const res = await tmdb.get(endpoint, { params });

        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [currentPage, searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    setFilters({ genre: "", language: "", rating: "" });
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value,
    }));
    setCurrentPage(1);
    setSearchQuery(""); 
  };

  
  const renderPagination = () => (
    <div className="flex justify-center items-center mt-6 gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  return (
    <div>
      <Navbar onFilterChange={handleFilterChange} onSearch={handleSearch} />

      {loading ? (
        <div className="text-center text-xl font-semibold py-10">Loading movies...</div>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onBook={setSelectedMovie} theme={theme} />
            ))}
          </div>
          {renderPagination()}
        </>
      )}

      {selectedMovie && (
        <BookingModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

