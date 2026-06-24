
const MovieService = () => {
    const
        _apiBase = 'https://api.themoviedb.org/3',
        _apiKey = 'e999b86158391a149c6dac438d345fd9',
        _imgBase = 'https://image.tmdb.org/t/p';

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    }

    const getAllMovies = async (category, pageNum) => {
        const popularMovies = await getResource(`${_apiBase}/movie/${category}?api_key=${_apiKey}&page=${pageNum}`);
        return popularMovies.results.map(movie => _transformAllMovies(movie));
    }

    const searchMovies = async (query, page = 1) => {
        const targetMovie = await getResource(`${_apiBase}/search/movie?api_key=${_apiKey}&page=${page}&query=${query}`);
        return targetMovie.results.map(movie => _transformAllMovies(movie))
    }

    const getMovie = async (id) => {
        const movie = await getResource(`${_apiBase}/movie/${id}?api_key=${_apiKey}&append_to_response=videos`);
        return _transformMovie(movie);
    }

    const _transformAllMovies = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: movie.poster_path ? `${_imgBase}/w500/${movie.poster_path}` : null,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average.toFixed(1)
        }
    }

    const _transformMovie = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: movie.poster_path ? `${_imgBase}/w500/${movie.poster_path}` : null,
            backdropPath: movie.backdrop_path ? `${_imgBase}/w780/${movie.backdrop_path}` : null,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average.toFixed(1),
            budget: movie.budget ? movie.budget.toLocaleString('en-US') : null,
            genres: movie.genres,
            originCountry: movie.origin_country,
            runtime: movie.runtime,
            video: movie.videos.results.find(video => video.site === 'YouTube' && video.type === 'Trailer')?.key || null
        }
    }

    return { getAllMovies, searchMovies, getMovie };
}
export default MovieService;