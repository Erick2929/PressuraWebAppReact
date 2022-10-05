import React,{Component, useState} from 'react';
import logo from '../assets/imgs/pressura-logotitle-white.png'

export class Register extends Component{

    render(){

        const [registerEmail, setRegisterEmail] = useState('')
        const [registerPassword, setRegisterPassword] = useState('')
    
        const register = async () => {
            
        }

        return (

            <div className="main">

                <div className='imgs'>
                    <img src={logo} className='logo' ></img>
                </div>

                <div className="sub-main">

                    <div>

                        <div>
                            <div style={{paddingTop: '20px'}}>
                                <h1>Inicia Sesion</h1>
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
                                
                                <button className="login-button">Login</button>
                                <button className="login-button-google">Login con google</button>
                               
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
        );

    }

}
