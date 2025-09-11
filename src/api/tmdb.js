import axios from "axios"; //so we dont repeat base url and api key
 
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
if (!API_KEY) {
  console.warn("REACT_APP_TMDB_API_KEY is not set in .env");
}
 
const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});


export default tmdb;
