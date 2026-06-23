import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import MovieList from "../../movieList/MovieList";
import NothingFound from "../../errors/NothingFound";
import './FavoritePage.scss';

const FavoritePage = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <section className="favorite-page">
            <h1 className="favorite-page__title">Favorite movies</h1>
            {favorites.length === 0 ? <NothingFound text={'Your favorites list is empty'} /> : <MovieList movies={favorites} />}
        </section>
    )
}
export default FavoritePage;