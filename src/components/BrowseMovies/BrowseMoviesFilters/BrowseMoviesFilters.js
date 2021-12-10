import axios from "axios";
import ExportedRating from "../../../db/Rating";
import ExportedSortBy from "../../../db/SortBy";
import { updateBackdrop } from "../../../features/movieId/ActiveBackdrop";
import { updateSearchTerm } from "../../../features/movieFilter/MovieFilter";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./BrowseMoviesFilters.css";
function BrowseMoviesFilters() {
  const [allFilter, setAllFilter] = new useState({
    query_term: "",
    quality: "",
    genre: "",
    rating: "0",
    sort_by: "date_added",
    order_by: "desc",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setAllFilter({ ...allFilter, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSearchTerm({ ...allFilter }));
  };
  const genres = {
    "": "All",
    action: "Action",
    adventure: "Adventure",
    animation: "Animation",
    biography: "Biography",
    comedy: "Comdey",
    crime: "Crime",
    documentry: "Documentry",
    drama: "Drama",
    family: "Family",
    fantasy: "Fantasy",
    "film-noir": "Film-Noir",
    "game-show": "Game-show",
    history: "History",
    horror: "Horror",
    music: "Music",
    musical: "Musical",
    mistery: "Mystery",
    news: "News",
    "reality-tv": "Reality-TV",
    romance: "Romance",
    "sci-fi": "Sci-Fi",
    sport: "Sport",
    "talk-show": "Talk-Show",
    thriller: "Thriller",
    war: "war",
    weester: "Western",
  };
  const sortByOption = [
    "date_added",
    "title",
    "seeds",
    "peers",
    "year",
    "rating",
    "like_count",
    "download_count",
  ];
  const genresOptions = Object.keys(genres)
    .map((igkeys) => {
      return (
        <option key={genres[igkeys]} value={igkeys}>
          {genres[igkeys]}
        </option>
      );
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  return (
    <div className="top-filter-container">
      <div className="top-filter_section">
        <label htmlFor="" className="search-title">
          Search Term:
        </label>
        <form onSubmit={handleSubmit} className="form-control search-term">
          <input name="query_term" onChange={handleChange} type="text" />{" "}
          <button className="btn search-btn">Search</button>
        </form>
        <div className="filter-options">
          <div className="filter-option_quality">
            <label className="filter-label" htmlFor="">
              Quality
            </label>{" "}
            <br />
            <select
              onChange={handleChange}
              className="filter-select-options"
              name="quality"
              id="quality-filter"
            >
              <option value="">All</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="2160p">2160p</option>
              <option value="3D">3D</option>
            </select>
          </div>
          <div className="filter-option_genre">
            <label htmlFor="">Genres</label> <br />
            <select
              onChange={handleChange}
              className="filter-select-options"
              name="genre"
              id="genre-filter"
            >
              {genresOptions}
            </select>
          </div>
          <div className="filter-rating">
            <label htmlFor="">Rating</label> <br />
            <select
              onChange={handleChange}
              className="filter-select-options"
              name="minimum_rating"
              id="rating-filter"
            >
              {ExportedRating.map((rating) => {
                return (
                  <option key={rating.value} value={rating.value}>
                    {rating.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="filter-order_by">
            <label htmlFor="">Sort By</label> <br />
            <select
              onChange={handleChange}
              className="filter-select-options"
              name="sort_by"
              id="sort_by-filter"
            >
              {ExportedSortBy.map((sort) => {
                return <option value={sort.value}>{sort.name}</option>;
              })}
            </select>
          </div>
          <div className="filter-order_by">
            <label htmlFor="">Order By</label> <br />
            <select
              onChange={handleChange}
              className="filter-select-options"
              name="order_by"
              id="order_by-filter"
            >
              <option value="desc">descending</option>
              <option value="asc">ascending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseMoviesFilters;
