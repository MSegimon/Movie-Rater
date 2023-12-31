import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import FavouritesMovieList from './components/FavouritesMovieList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=78442ac3`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    document.title = "Movie Rater";

    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    items.sort((a, b) => b.userRating - a.userRating);

    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie, userRating) => {
    movie.userRating = userRating;

    const movieIndex = favourites.findIndex(item => item.imdbID === movie.imdbID);

    let newFavouriteList = [];

    if (movieIndex !== -1) {
      newFavouriteList = [
        ...favourites.slice(0, movieIndex),
        movie,
        ...favourites.slice(movieIndex + 1)
      ];
    } else {
      newFavouriteList = [...favourites, movie];
    }

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };


  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies/Series' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='My List' />
      </div>
      <div className='row'>
        <FavouritesMovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
        />
      </div>
    </div>
  );
};

export default App;
