import React,{Component} from 'react';


export class LoginForm extends Component{

    render(){

        return (

            <div className="main">

                <div className='imgs'>
                    Hola
                </div>

                <div className="sub-main">

                    <div>

                        <div>
                            <h1>Iniciar Sesion</h1>

                            <div className='login-label'>
                                Correo Electronico:
                            </div>

                            <div className="second-input">
                                <input type="text" placeholder="Email" className="name" />
                            </div>
                            <div className='login-label'>
                                Contraseña:
                            </div>
                            <div className="second-input">
                                <input type="password" placeholder="Password" className="name" />
                            </div>

                            <div className="login-button">
                                <button>Login</button>
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