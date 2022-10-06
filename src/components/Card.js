import React, { Component } from 'react';
import './Card.css';
import SearchBar from './SearchBar';

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <SearchBar />
                <p>
                    Hola
                </p>
            </div>
        );
    }
}

export default Card;