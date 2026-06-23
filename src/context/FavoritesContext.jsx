import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (id) => {
        return favorites.some(movie => movie.id === id);
    }

    const toggleFavorite = (movie) => {
        if (isFavorite(movie.id))
            setFavorites(prev => prev.filter(fav => fav.id !== movie.id));
        else
            setFavorites(prev => [...prev, movie]);
    }

    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesProvider;