import { useParams, Link } from 'react-router-dom';
import './SingleMoviePage.scss';
import { useContext, useEffect, useState } from 'react';
import MovieService from '../../services/MovieService';
import Loader from '../../loader/Loader';
import ErrorMessage from '../../errors/ErrorMessage';
import { FavoritesContext } from '../../context/FavoritesContext';

const SingleMoviePage = () => {

    const
        { movieId } = useParams(),
        { getMovie } = MovieService();

    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        getMovie(movieId)
            .then(movie => {
                setMovie(movie);
                setIsLoading(false);
            })
            .catch(error => {
                setIsError(true);
                setIsLoading(false);
            })
    }, [movieId]);

    const loader = isLoading ? <Loader /> : null;
    const errorMessage = isError ? <ErrorMessage /> : null;
    const content = !(isLoading || isError || !movie) ? <View movie={movie} /> : null

    return (
        <>
            {loader}
            {errorMessage}
            {content}
        </>
    )
}

export default SingleMoviePage;

const View = ({ movie }) => {
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
    const favorited = isFavorite(movie.id)
    const currentDate = new Date().toLocaleDateString('en-CA');
    const isSoon = movie.releaseDate && new Date(movie.releaseDate) > new Date(currentDate);
    const diffYears = (new Date(currentDate) - new Date(movie.releaseDate)) / (1000 * 60 * 60 * 24 * 365);
    const isNew = movie.releaseDate && diffYears >= 0 && diffYears <= 1;

    return (
        <div className="single-movie">
            <img
                src={movie.backdropPath || null}
                alt="Backdrop"
                className="single-movie__backdrop"
            />

            <div className="single-movie__content">
                <img
                    src={movie.posterPath}
                    alt={movie.title}
                    className="single-movie__poster"
                />

                <div className="single-movie__info">
                    <div className="single-movie__title-wrapper">
                        <h1 className="single-movie__title">{movie.title}</h1>
                        {isSoon ?
                            <span className="single-movie__soon">Soon</span>
                            :
                            null
                        }
                        {isNew ? <span className="single-movie__new">New</span> : null}
                        <button
                            onClick={() => toggleFavorite(movie)}
                            className={`single-movie__favorite-btn ${favorited ? 'single-movie__favorite-btn--active' : ''}`}
                            aria-label="Toggle Favorite"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="single-movie__favorite-icon">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>

                    <div className="single-movie__meta">
                        {!isSoon ? <span className="single-movie__rating">★ {movie.voteAverage}</span> : null}
                        <span className="single-movie__year">Released at: {movie.releaseDate}</span>
                        <span className="single-movie__runtime">Duration: {movie.runtime} minutes</span>
                    </div>

                    <div className="single-movie__genres">
                        {movie.genres.map((genre) =>
                            <span key={genre.id} className="single-movie__genre">{genre.name}</span>
                        )}
                    </div>

                    <h3 className="single-movie__overview-title">Overview</h3>
                    <p className="single-movie__overview">{movie.overview}</p>

                    <div className="single-movie__detail">
                        <span>Budget:</span>
                        <span>${movie.budget}</span>
                    </div>

                    <div className="single-movie__detail">
                        <span>Country:</span>
                        <span>{movie.originCountry ? movie.originCountry.join(', ') : 'No Data'}</span>
                    </div>

                    <Link to="/" className="single-movie__back">← Back to main page</Link>
                </div>
            </div>
            {movie.video
                ? (
                    <div className="single-movie__trailer">
                        <h2 className="single-movie__trailer-title">Trailer</h2>
                        <iframe
                            className="single-movie__video"
                            src={`https://www.youtube.com/embed/${movie.video}`}
                            title="Trailer"
                            allowFullScreen
                        ></iframe>
                    </div>
                )
                : null}
        </div>
    )
}