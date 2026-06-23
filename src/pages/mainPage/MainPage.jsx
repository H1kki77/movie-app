import { useEffect, useRef, useState } from "react";
import MovieList from "../../movieList/MovieList"
import SearchPanel from "../../searchPanel/SearchPanel"
import MovieService from "../../services/MovieService"
import ErrorMessage from '../../errors/ErrorMessage';
import NothingFound from "../../errors/NothingFound";
import Loader from "../../loader/Loader";
import './MainPage.scss';

const MainPage = () => {
    const { getPopularMovies, searchMovies } = MovieService();

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [query, setQuery] = useState('');
    const [moviesEnded, setMoviesEnded] = useState(false);
    const [nothingFound, setNothingFound] = useState(false);

    const listRef = useRef(null);

    const loader = isLoading ? <Loader /> : null;
    const errorMessage = isError ? <ErrorMessage /> : null;
    const content = !(isLoading || isError || nothingFound) ? <MovieList movies={movies} listRef={listRef} /> : null
    const nothingFoundMessage = nothingFound ? <NothingFound text={'There are no movies you are finding for'} /> : null

    const onRequest = ((pageNum, initial) => {
        if (initial) {
            setIsLoading(true);
            setNothingFound(false);
        }

        let request = query === '' ? getPopularMovies(pageNum) : searchMovies(query, pageNum);

        request
            .then(data => {
                setMoviesEnded(data.length < 20);
                if (initial) {
                    if (data.length === 0) {
                        setIsLoading(false);
                        setNothingFound(true);
                    }
                    setMovies(data);
                    setPageNum(1);
                    setIsLoading(false);
                }
                else {
                    const moviesLength = movies.length
                    setMovies(prevMovies => [...prevMovies, ...data]);
                    setPageNum(pageNum);
                    setIsLoading(false);
                    setTimeout(() => {
                        console.log(listRef.current)
                        if (listRef.current) {
                            return listRef.current.children[moviesLength].scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            })
            .catch(error => {
                setIsError(true);
                setIsLoading(false);
            });

    });

    useEffect(() => {
        setIsError(false);
        onRequest(1, true);
    }, [query]);

    const onSearch = (term) => {
        setQuery(term);
    }

    return (
        <>
            <SearchPanel onSearch={onSearch} />
            {content}
            {errorMessage}
            {loader}
            {nothingFoundMessage}
            {!(isError || isLoading || moviesEnded)
                ?
                <button
                    className="load-more"
                    onClick={() => onRequest(pageNum + 1, false)}>Load more
                </button>
                : null}
        </>
    )
}

export default MainPage;