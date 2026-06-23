import { useState } from 'react';
import './SearchPanel.scss';

const SearchPanel = ({ onSearch }) => {

    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
        setTerm('');
    }

    return (
        <section className="search mt-5 px-3">
            <div className="search__header">
                <h2 className="search__title">Find Your Movie</h2>
                <p className="search__subtitle">Thousands of movies and TV shows are waiting for you</p>
            </div>
            <form
                className="search__form"
                onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="search__input"
                    placeholder="Interstellar"
                />
                <button className="search__button" type="submit">
                    Search
                </button>
            </form>
        </section>
    )
}
export default SearchPanel;