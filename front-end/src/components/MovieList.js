import React, { useState } from 'react';
import AddFavourite from './AddFavourites';

// const MovieList = (props) => {
//     return (
//         <>
//             {props.movies.map((movie, index) => (
//                 <div className='image-container d-flex justify-content-start m-3'>
//                     <img src={movie.Poster} alt='movie'></img>
//                     <div
//                         onClick={() => props.handleFavouritesClick(movie)}
//                         className='overlay d-flex align-items-center justify-content-center'
//                     >
//                         <AddFavourite />
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

// const MovieList = (props) => {
//     const [showPopup, setShowPopup] = useState(false);
//     const [selectedMovie, setSelectedMovie] = useState(null);
//     const [userRating, setUserRating] = useState(0);

//     const handleMovieClick = (movie) => {
//         setShowPopup(true);
//         setSelectedMovie(movie);
//     };

//     const handleRatingChange = (event) => {
//         setUserRating(event.target.value);
//     };

//     const handleConfirmRating = () => {
//         setShowPopup(false);
//         props.handleFavouritesClick(selectedMovie, userRating);
//     };

//     return (
//         <>
//             {showPopup && (
//                 <div className='rating-popup'>
//                     <input type="number" value={userRating} onChange={handleRatingChange} min="0" max="10" />
//                     <button onClick={handleConfirmRating}>Confirm Rating</button>
//                 </div>
//             )}
//             {props.movies.map((movie, index) => (
//                 <div className='image-container d-flex justify-content-start m-3'>
//                     <img src={movie.Poster} alt='movie'></img>
//                     <div
//                         onClick={() => handleMovieClick(movie)}
//                         className='overlay d-flex align-items-center justify-content-center'
//                     >
//                         <AddFavourite />
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

const MovieList = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [userRating, setUserRating] = useState(0);

    const handleMovieClick = (movie) => {
        setShowPopup(true);
        setSelectedMovie(movie);
    };

    const handleRatingChange = (event) => {
        setUserRating(event.target.value);
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
                        <h4>Set Rating for {selectedMovie?.Title}</h4>
                        <input type="number" value={userRating} onChange={handleRatingChange} min="0" max="10" />
                        <button onClick={handleConfirmRating}>Confirm Rating</button>
                    </div>
                </div>
            )}
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div
                        onClick={() => handleMovieClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <AddFavourite />
                    </div>
                </div>
            ))}
        </>
    );
};


export default MovieList;
