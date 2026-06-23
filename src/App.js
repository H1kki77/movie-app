import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/mainPage/MainPage';
import AppHeader from './appHeader/AppHeader';
import SingleMoviePage from './pages/singleMoviePage/SingleMoviePage';
import FavoritesProvider from './context/FavoritesContext';
import FavoritePage from './pages/favoritePage/FavoritePage';

function App() {
    return (
        <Router>
            <FavoritesProvider>
                <div className="App">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/favorite" element={<FavoritePage />} />
                        <Route path='/movies/:movieId' element={<SingleMoviePage />} />
                    </Routes>
                </div>
            </FavoritesProvider>
        </Router>
    );
}

export default App;
