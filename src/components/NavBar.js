import React, { Component } from 'react';
import logo from '../assets/imgs/pressura-logo-white.png';
import profile from '../assets/imgs/icon-profile.png'

class NavBar extends Component {
    render() {
        return (
            <nav className='navbar'>
                <a href='/' className='navbar-logo'>
                    <img src={logo} height='32px'></img>
                </a>
                <ul>
                    <li>
                        <a href='/logout'>Cerrar Sesión</a>
                    </li>
                    <li>
                        <a href='/profile'>
                            <img src={profile} height='32px'></img>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;