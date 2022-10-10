import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { auth } from '../firebase' 
import logo from '../assets/imgs/pressura-logotitle-white.png'
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginPasswordConf, setLoginPasswordConf] = useState('')
    const [user, setUser] = useState({});
    const [notSame, setNotSame] = useState(false);
      
    
    const goToLogIn = () => {
        navigate('/')
    }

    const changeEmail = (event) => {
        setLoginEmail(event.target.value);
        console.log(event.target.value)
    } 
  
    const changePassword = (event) => {
        setLoginPassword(event.target.value);
        console.log(event.target.value)
    } 
    const changePasswordConf = (event) => {
        setLoginPasswordConf(event.target.value);
        console.log(event.target.value)
    } 

    const ingresarConGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
        console.log(provider)
    }

    const signup = async () => {

        console.log(loginEmail);

        try{
            const user = await createUserWithEmailAndPassword(auth,loginEmail,loginPassword);
            //setUser(user)
            console.log(user);
            alert('Su cuenta ha sido creada con exito!');
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

  return (
    <div className="main">

        <div className='imgs'>
            <img src={logo} className='logo' ></img>
        </div>

        <div className="sub-main">

            <div>

                <div style={ {padding:'10px'} }>
                    <div style={{paddingTop: '20px'}}>
                        <h1>Registrate</h1>
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
                    <div className='login-label'>
                        Confirmar contraseña:
                    </div>
                    <div className="second-input">
                        <input type="password" placeholder="Contraseña" className="name" 
                        value={loginPasswordConf}
                        onChange={changePasswordConf}
                         />
                    </div>
                    

                    
                    <div className='button-group'>
                        
                        <button 
                        className="login-button" 
                        onClick={signup}>
                            Registrate
                        </button>
                        {/* <button className="login-button-google">Login con google</button> */}
                        <button  
                        onClick={ingresarConGoogle} 
                        className="login-button-google">Registrate Con Google</button>
                        
                    </div>

                    <div className="link" style={{paddingTop: '20px'}}>
                        <p>
                            Ya tienes cuenta? <a href="" onClick={goToLogIn} >Ingresa aqui</a>
                        </p>
                    </div>


                </div>
            </div>


        </div>
    </div>
  )
}
