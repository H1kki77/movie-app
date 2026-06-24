import './MovieCard.scss';
import posterNotFound from '../resources/no-poster.png';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useContext } from 'react';

const MovieCard = ({ title, overview, posterPath, releaseDate, voteAverage, id }) => {

    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
    const favorited = isFavorite(id);
    const currentDate = new Date().toLocaleDateString('en-CA');
    const isSoon = releaseDate && new Date(releaseDate) > new Date(currentDate);
    const diffYears = (new Date(currentDate) - new Date(releaseDate)) / (1000 * 60 * 60 * 24 * 365);
    const isNew = releaseDate && diffYears >= 0 && diffYears <= 1;

    return (
        <div className="movie-card">
            <div className="movie-card__poster-wrap">
                {isSoon ?
                    <span className="movie-card__soon">Soon</span>
                    :
                    <span className="movie-card__rating">★ {voteAverage || '0.0'}</span>
                }
                {isNew ? <span className="movie-card__new">New</span> : null}
                <img
                    src={posterPath || posterNotFound}
                    className="movie-card__poster"
                    alt={title || 'Movie'}
                />
            </div>
            <div className="movie-card__body">
                <h5 className="movie-card__title">{title || 'Movie Title'}</h5>
                <p className="movie-card__overview">
                    {overview || 'Movie overview...'}
                </p>
                <div className="movie-card__footer">
                    <span className="movie-card__year">
                        {releaseDate ? releaseDate.slice(0, 4) : 'N/D'}
                    </span>
                    <div className="movie-card__actions">
                        <button
                            onClick={() => toggleFavorite({ id, title, overview, posterPath, releaseDate, voteAverage })}
                            className={`movie-card__favorite-btn ${favorited ? 'movie-card__favorite-btn--active' : ''}`}
                            aria-label="Toggle Favorite"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="movie-card__favorite-icon">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                        <Link to={`/movies/${id}`} style={{ textDecoration: 'none' }} className="movie-card__detail-btn">Details</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;