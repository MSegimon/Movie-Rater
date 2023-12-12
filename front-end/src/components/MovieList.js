import React, { useState } from 'react';
import AddFavourite from './AddFavourites';

const MovieList = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [userRating, setUserRating] = useState(0);

    const handleMovieClick = (movie) => {
        setShowPopup(true);
        setSelectedMovie(movie);
    };

    const handleRatingChange = (event) => {
        let value = parseFloat(event.target.value);

        // Check if the number is between 0 and 10 and has at most one decimal place
        if (value >= 0 && value <= 10 && !isNaN(value)) {
            value = Math.round(value * 10) / 10; // Round to one decimal place
            setUserRating(value);
        }
    };

    const handleConfirmRating = () => {
        setShowPopup(false);
        props.handleFavouritesClick(selectedMovie, userRating);
    };

    return (
        <>
            {showPopup && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h4 className='popup-heading'>Set Rating for {selectedMovie?.Title}</h4>
                        <span className='m-1'></span>
                        <input className="popup-input" type="number" value={userRating} onChange={handleRatingChange} min="1" max="10" step="0.1" />
                        <span className='m-2'></span>
                        <button className="popup-button" onClick={handleConfirmRating}>Confirm Rating</button>
                    </div>
                </div>
            )}
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-3 poster-container'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div
                        onClick={() => handleMovieClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center add-favorite-container'
                    >
                        <AddFavourite />
                    </div>
                </div>
            ))}
        </>
    );
};


export default MovieList;
