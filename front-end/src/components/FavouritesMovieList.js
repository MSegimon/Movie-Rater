import React from 'react';
import RemoveFavourites from './RemoveFavourites';

const FavouritesMovieList = (props) => {

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div
                        onClick={() => props.handleFavouritesClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <RemoveFavourites
                            movie={movie}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default FavouritesMovieList;
