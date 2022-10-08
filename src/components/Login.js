import React, { useState } from 'react'
import { signInWithEmailAndPassword,onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase' 

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({});

    

    
    const cambiarEmail = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    }
    const cambiarPassword = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    }
    const enviarDatos = (e) => {
        e.preventDefault();
        console.log('Enviado');
    }
    const login = async () => {
        try{
            const user = await signInWithEmailAndPassword(auth,email,password);
        }
        catch (error){
            console.log(error.message);
        }
    }
    const logout = async () => {
        await signOut(auth);
    }

  return (
    <div>

        <form onSubmit={enviarDatos}>
            <h2>Login</h2>
            <p>Usuario Logeado: </p>
            <div>
                <input type="email" placeholder='ejemplo@examplemail.com' 
                value={email}
                onChange={cambiarEmail}
                />
            </div>
            <div>
                <input type="password" placeholder='contraseña'
                value={password}
                onChange={cambiarPassword}
                />
            </div>
            <button type='submit' onClick={login}>Ingresar </button>
            <button type='button' onClick={logout}>Salir de la cuenta </button>
        </form> 

    </div>
  )
}
