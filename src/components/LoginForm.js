import React,{Component} from 'react';
import logo from '../assets/imgs/pressura-logotitle-white.png'

export class LoginForm extends Component{

    render(){

        return (

            <div className="main">

                <div className='imgs'>
                    <img src={logo} className='logo' ></img>
                </div>

                <div className="sub-main">

                    <div>

                        <div>
                            <h1>Inicia Sesion</h1>

                            <div className='login-label-1'>
                                Correo Electronico:
                            </div>

                            <div className="second-input">
                                <input type="text" placeholder="ejemplo@hotmail.com" className="name" />
                            </div>
                            <div className='login-label'>
                                Contraseña:
                            </div>
                            <div className="second-input">
                                <input type="password" placeholder="Contraseña" className="name" />
                            </div>
                            
                            <div className='button-group'>
                                
                                <button className="login-button">Login</button>
                                <button className="login-button-google">Login con google</button>
                               
                            </div>

                   
                            <p className="link">
                                No tienes cuenta? <a href="#">Registrate</a>
                            </p>


                        </div>
                    </div>


                </div>
            </div>
        );

    }

}
