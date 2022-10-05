import React,{Component, useState} from 'react';
import logo from '../assets/imgs/pressura-logotitle-white.png'

export class LoginForm extends Component{

    render(){
        return (
            <h1>Hola</h1>
        );
        // const [loginEmail, setLoginEmail] = useState('')
        // const [loginPassword, setLoginPassword] = useState('')
    
        // const login = async () => {
            
        // }
        // const logout = async () => {
            
        // }

        // return (

        //     <div className="main">

        //         <div className='imgs'>
        //             <img src={logo} className='logo' ></img>
        //         </div>

        //         <div className="sub-main">

        //             <div>

        //                 <div>
        //                     <div style={{paddingTop: '20px'}}>
        //                         <h1>Inicia Sesion</h1>
        //                     </div>
                            
        //                     <div className='login-label-1'>
        //                         Correo Electronico:
        //                     </div>

        //                     <div className="second-input">
        //                         <input type="text" placeholder="ejemplo@hotmail.com" className="name" onChange={(event) => {
        //                             setLoginEmail(event.target.value);
        //                         }} />
        //                     </div>
        //                     <div className='login-label'>
        //                         Contraseña:
        //                     </div>
        //                     <div className="second-input">
        //                         <input type="password" placeholder="Contraseña" className="name" onChange={(event) => {
        //                             setLoginPassword(event.target.value);
        //                         }} />
        //                     </div>
                            
        //                     <div className='button-group'>
                                
        //                         <button className="login-button">Login</button>
        //                         <button className="login-button-google">Login con google</button>
                               
        //                     </div>

        //                     <div className="link" style={{paddingTop: '20px'}}>
        //                         <p>
        //                             No tienes cuenta? <a href="#">Registrate</a>
        //                         </p>
        //                     </div>


        //                 </div>
        //             </div>


        //         </div>
        //     </div>
        // );

    }

}
