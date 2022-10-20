import React, { useEffect } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/imgs/pressura-logotitle-white.png";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Register() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordConf, setLoginPasswordConf] = useState("");
  const [user, setUser] = useState({});
  const [userUid, setUserUid] = useState({});
  const [length, setLength] = useState(0);
  const [notLong, setNotLong] = useState(false);
  const [notSame, setnotSame] = useState(false);
  const cuentasDoc = collection(db, "Doctor");

  const crearDoctor = async () => {
    console.log("se crea doc");
    await setDoc(doc(cuentasDoc, userUid), {
      CorreoElectronico: user,
      IDDoctor: "",
      Nombre: user,
      Pacientes: [""],
    });
  };

  const checkSame = () => {
    if (loginPassword === loginPasswordConf) {
      setnotSame(false);
    } else {
      console.log("not Samee -->", loginPassword, loginPasswordConf);
      setnotSame(true);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
      if (userSession !== null) {
        console.log("vvvv esta es la cuenta ");
        console.log(userSession.email);
        setUser(userSession.email);
        setUserUid(userSession.uid);
        crearDoctor();
      } else {
        console.log("no hay cuenta logeada ");
      }
    });
  }, []);

  const goToLogIn = () => {
    navigate("/");
  };

  const changeEmail = (event) => {
    setLoginEmail(event.target.value);
    console.log(event.target.value);
  };

  const changePassword = (event) => {
    setLoginPassword(event.target.value);
    setLength(event.target.value.length);
    console.log("length ->", length);
    console.log(event.target.value);
    if (length <= 11) {
      setNotLong(true);
    } else {
      setNotLong(false);
    }
  };

  const changePasswordLength = (event) => {
    setLoginPasswordConf(event.target.value);
    console.log(event.target.value);
    if (length <= 10) {
      setNotLong(true);
    } else {
      setNotLong(false);
    }
  };

  const changePasswordConf = (event) => {
    setLoginPasswordConf(event.target.value);
    console.log(event.target.value);
  };

  const ingresarConGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    console.log(provider);
  };

  const signup = async () => {
    if (!notSame) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        //setUser(user)
        console.log(user.uid);
        navigate("/register-data");
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
  };
  const logout = async () => {
    console.log("salio de la cuenta");
    alert("Has salido de la cuenta");
    await signOut(auth);
  };

  return (
    <div className="main">
      <div className="imgs">
        <img src={logo} className="logo"></img>
      </div>
      <div className="sub-main">
        <div className="sub-main-content">
          <div style={{ padding: "10px"}}>
            <div style={{ paddingTop: "20px" }}>
              <h1>Registrate</h1>
            </div>

            <div className="login-label-1">Correo Electronico:</div>

            <div className="second-input">
              <input
                type="email"
                placeholder="ejemplo@hotmail.com"
                className="name"
                value={loginEmail}
                onChange={changeEmail}
              />
            </div>
            <div className="login-label">Contraseña:</div>
            {notLong && (
              <p style={{ color: "red" }}>
                {" "}
                La contraseña debe de contener al menos 11 caracteres
              </p>
            )}
            <div className="second-input">
              <input
                type="password"
                placeholder="Contraseña"
                className="name"
                value={loginPassword}
                onChange={changePassword}
              />
            </div>
            {/* <div className='login-label'>
                        Confirmar contraseña:
                    </div>
                    {notSame && <p style={{color:'red'}}> La contraseñas no coinciden</p> }
                    <div className="second-input">
                        <input type="password" placeholder="Contraseña" className="name" 
                        value={loginPasswordConf}
                        onChange={changePasswordConf}
                         />
                    </div> */}

            <div className="button-group">
              <button className="login-button" onClick={signup}>
                Registrate
              </button>

              <button
                onClick={ingresarConGoogle}
                className="login-button-google"
              >
                Registrate Con Google
              </button>
            </div>

            <div className="link" style={{ paddingTop: "20px" }}>
              <p>
                Ya tienes cuenta?{" "}
                <a href="" onClick={goToLogIn}>
                  Ingresa aqui
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
