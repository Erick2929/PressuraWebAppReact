import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    render() {
        return (
            <div className='search-bar'>
                <input type="text" placeholder="Buscar"/>
                <div className='icon-search'></div>
                <div className='add'>
                    <p>+</p>
                </div>
            </div>
        );
    }
}

export default SearchBar;