import logo from '../src/assets/imgs/pressura-logotitle-white.png'
import './App.css';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase' 
import Register from './components/Register';
import LoginForm from './components/LoginForm'
import Login from './components/Login';


function App() {

  return ( 
    // <Register></Register>
    <LoginForm></LoginForm>
    // <Login></Login>
  );
}

export default App;
