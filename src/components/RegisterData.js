import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db, auth } from "../firebase";
import logo from '../assets/imgs/pressura-logotitle-white.png'

export default function RegisterData() {


    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [iDDoctor, setIDDoctor] = useState('')
    const [iDDoctorConf, setIDDoctorConf] = useState('')
    const [user, setUser] = useState({});
    const [userUid, setUserUid] = useState({});
    const cuentasDoc = collection(db, "Doctor");
    
    const crearDoctor = async () => {
        console.log('se crea doc')
        await setDoc(doc(cuentasDoc, userUid), {
            CorreoElectronico: user,
            IDDoctor: "",
            Nombre: user,
            Pacientes: [""]
        });
    }
    
    const crearDoctor1 = async () => {

        console.log('se va a crear cuenta');


        try{
            console.log('se crea doc')
            await setDoc(doc(cuentasDoc, userUid), {
                CorreoElectronico: user,
                IDDoctor: user,
                Nombre: name,
                Pacientes: [""]
            });
            alert('Su cuenta ha sido creada con exito!');
            navigate('/')
        }

        catch (error){
            alert(error.message);
        }
        
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userSession) => {
            if(userSession !== null){
                console.log('vvvv esta es la cuenta Ya en Register data')
                console.log(userSession.email)
                setUser(userSession.email)
                setUserUid(userSession.uid)
            }
            else{
                console.log('no hay cuenta logeada ')
            }
        })
    },[])
    

    const changeName = (event) => {
        setName(event.target.value);
        console.log(event.target.value)
    } 
  
    const changeIDDoctor = (event) => {
        setIDDoctor(event.target.value);
        console.log(event.target.value)
    } 
    const changeIDDoctorConf = (event) => {
        setIDDoctorConf(event.target.value);
        console.log(event.target.value)
    } 

    return (
        <div className="main">
    
            <div className='imgs'>
                <img src={logo} className='logo' ></img>
            </div>
    
            <div className="sub-main">
    
                <div>
    
                    <div style={ {padding:'10px', minWidth:'40vh'}}>
                        <div style={{paddingTop: '20px'}}>
                            <h1>Ingresa tu nombre</h1>
                        </div>
                        
                        <div className='login-label-1'>
                            Nombre Completo:
                        </div>
    
                        <div className="second-input">
                            <input type="text" placeholder="Roberto Becerril Loya" className="name" 
                            value={name}
                            onChange={changeName}
                             />
                        </div>
                        
    
                        
                        <div className='button-group-end'>
                            
                            <button 
                            className="login-button" 
                            onClick={crearDoctor1}>
                                Guardar Datos
                            </button>
                            
                            
                        </div>
    
                        <div className="link" style={{paddingTop: '20px'}}>

                        </div>
    
    
                    </div>
                </div>
    
    
            </div>
        </div>
      )
}
