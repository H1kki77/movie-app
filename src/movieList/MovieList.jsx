import MovieCard from "../movieCard/MovieCard";
import './MovieList.scss';

const MovieList = ({ movies, listRef }) => {
    return (
        <section className="movie-list">
            <div className="movie-list__grid" ref={listRef}>
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        overview={movie.overview}
                        posterPath={movie.posterPath}
                        releaseDate={movie.releaseDate}
                        voteAverage={movie.voteAverage}
                    />
                ))}
            </div>
        </section>
    );
}

export default MovieList;