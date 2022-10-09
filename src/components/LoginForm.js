import React from 'react'
import { useState } from 'react';
import { signInWithEmailAndPassword,signin, signOut,signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase' 
import logo from '../assets/imgs/pressura-logotitle-white.png'

export default function LoginForm() {

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [user, setUser] = useState({});
      
    
  
    const changeEmail = (event) => {
        setLoginEmail(event.target.value);
        console.log(event.target.value)
    } 
  
    const changePassword = (event) => {
        setLoginPassword(event.target.value);
    } 

    const login = async () => {

        console.log(loginEmail);

        try{
            const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
            //setUser(user)
            console.log(user);
        }

        catch (error){
            console.log(error.message);
            alert(error.message);
        }
        
    }
    const logout = async () => {
        console.log('salio de la cuenta')
        alert('Has salido de la cuenta')
        await signOut(auth);
        //console.log(user)
    }

    const ingresarConGoogle = async () => {
        
    }

  return (
    <div className="main">

        <div className='imgs'>
            <img src={logo} className='logo' ></img>
        </div>

        <div className="sub-main">

            <div style={ {padding:'10px'} }>

                <div>
                    <div style={{paddingTop: '20px'}}>
                        <h1>Inicia Sesion</h1>
                    </div>
                    
                    <div className='login-label-1'>
                        Correo Electronico:
                    </div>

                    <div className="second-input">
                        <input type="email" placeholder="ejemplo@hotmail.com" className="name" 
                        value={loginEmail}
                        onChange={changeEmail}
                         />
                    </div>
                    <div className='login-label'>
                        Contraseña:
                    </div>
                    <div className="second-input">
                        <input type="password" placeholder="Contraseña" className="name" 
                        value={loginPassword}
                        onChange={changePassword}
                         />
                    </div>
                    
                    <div className='button-group'>
                        
                        <button 
                        className="login-button" 
                        onClick={login}>
                            Ingresar
                        </button>
                        {/* <button className="login-button-google">Login con google</button> */}
                        <button  
                        onClick={logout} 
                        className="login-button-google">Ingresa con Google</button>
                        
                    </div>

                    <div className="link" style={{paddingTop: '20px'}}>
                        <p>
                            No tienes cuenta? <a href="#">Crea una aqui</a>
                        </p>
                    </div>


                </div>
            </div>


        </div>
    </div>
  )
}
