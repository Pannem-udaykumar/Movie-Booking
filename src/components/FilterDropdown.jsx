import "./FilterDropdown.css";

export default function FilterDropdown({ onFilterChange }) {
  return (
    <div className="filter-wrapper">
      <div className="filter-dropdown">
        <button className="filter-toggle">Filter ⏷</button>
        <div className="filter-options">
          <label>
            Genre:
            <select onChange={(e) => onFilterChange("genre", e.target.value)}>
              <option value="">All Genres</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="10749">Romance</option>
              <option value="27">Horror</option>
              <option value="878">Sci-Fi</option>
              <option value="16">Animation</option>
              <option value="12">Adventure</option>
              <option value="80">Crime</option>
              <option value="14">Fantasy</option>
            </select>
          </label>

          <label>
            Language:
            <select onChange={(e) => onFilterChange("language", e.target.value)}>
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="kn">Kannada</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
              <option value="ja">Japanese</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
            </select>
          </label>

          <label>
            Rating:
            <select onChange={(e) => onFilterChange("rating", e.target.value)}>
              <option value="">All Ratings</option>
              <option value="9">9+</option>
              <option value="8">8+</option>
              <option value="7">7+</option>
              <option value="6">6+</option>
              <option value="5">5+</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
              <option value="2">2+</option>
              <option value="1">1+</option>
              <option value="0">0+</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
