import { Link } from 'react-router-dom';
import './AppHeader.scss';

const AppHeader = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <Link to="/" className="header__logo">
                    Movie<span className="header__logo-accent">App</span>
                </Link>

                <nav className="header__nav">
                    <a href="#" className="header__link">♥ Favorites</a>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;