import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase' 
import logo from '../assets/imgs/pressura-logotitle-white.png'

export default function Register() {

    const [registerEmail, setRegisterEmail] = useState('')

  const [registerPassword, setRegisterPassword] = useState('')

  const [user, setUser] = useState({});
    
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
      console.log(user);
    }
    catch (error){
      console.log(error.message);
    }
  }

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const login = async () => {
      
  }
  const logout = async () => {
      await signOut(auth);
  }

  return (
    <div className="main">

        <div className='imgs'>
            <img src={logo} className='logo' ></img>
        </div>

        <h3>Ususario logeado: {user?.email}</h3>
        

        <div className="sub-main">

            <div>

                <div>
                    <div style={{paddingTop: '20px'}}>
                        <h1>Registrate</h1>
                    </div>
                    
                    <div className='login-label-1'>
                        Correo Electronico:
                    </div>

                    <div className="second-input">
                        <input type="text" placeholder="ejemplo@hotmail.com" className="name" onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }} />
                    </div>
                    <div className='login-label'>
                        Contraseña:
                    </div>
                    <div className="second-input">
                        <input type="password" placeholder="Contraseña" className="name" onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }} />
                    </div>
                    
                    <div className='button-group'>
                        
                        <button className="login-button" onClick={register}>Login</button>
                        <button className="login-button-google">Login con google</button>
                        <button  onClick={logout} className="login-button-google">signOut</button>
                        
                    </div>

                    <div className="link" style={{paddingTop: '20px'}}>
                        <p>
                            Ya tienes cuenta? <a href="#">Ingresa Aqui</a>
                        </p>
                    </div>


                </div>
            </div>


        </div>
    </div>
  )
}
