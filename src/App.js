import logo from '../src/assets/imgs/pressura-logotitle-white.png'
import './App.css';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase' 
import Register from './components/Register';
import LoginForm from './components/LoginForm'

function App() {

  return ( 
    // <Register></Register>
    <LoginForm></LoginForm>
  );
}

export default App;
