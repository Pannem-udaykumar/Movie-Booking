
import axios from "axios";

const KEY = process.env.REACT_APP_TMDB_API_KEY; 

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: KEY,
  },
});

export const getMovieTrailer = async (movieId) => {
  try {
    const res = await tmdb.get(`/movie/${movieId}/videos`);
    const trailers = res.data.results.filter(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailers.length ? trailers[0].key : null;
  } catch (err) {
    console.error("Trailer fetch error", err);
    return null;
  }
};

export default tmdb;

