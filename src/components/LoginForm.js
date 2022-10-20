import React from "react";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/imgs/pressura-logotitle-white.png";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
      if (userSession !== null) {
        console.log("vvvv esta es la cuenta ");
        console.log(userSession.email);
        setUser(userSession.email);
      } else {
        console.log("no hay cuenta logeada ");
      }
    });
  }, []);

  const goToSignIn = () => {
    navigate("/signin");
  };

  const changeEmail = (event) => {
    setLoginEmail(event.target.value);
    console.log(event.target.value);
  };

  const changePassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const login = async () => {
    console.log(loginEmail);

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //setUser(user)
      console.log(user);
      navigate("/mainView");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  const logout = async () => {
    console.log("salio de la cuenta");
    alert("Has salido de la cuenta");
    await signOut(auth);
    setUser("Has salido de la cuenta");
    //console.log(user)
  };

  const ingresarConGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    console.log(provider);
  };

  return (
    <div className="main">
      <div className="imgs">
        <img src={logo} className="logo"></img>
      </div>

      <div className="sub-main">
        <div className="sub-main-content" style={{ padding: "10px" }}>
          <div>
            <div style={{ paddingTop: "20px" }}>
              <h1>Inicia Sesion</h1>
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
            <div className="second-input">
              <input
                type="password"
                placeholder="Contraseña"
                className="name"
                value={loginPassword}
                onChange={changePassword}
              />
            </div>

            <div className="button-group">
              <button className="login-button" onClick={login}>
                Ingresar
              </button>
              {/* <button className="login-button-google">Login con google</button> */}
              <button onClick={logout} className="login-button-google">
                Ingresa con Google
              </button>
            </div>

            <div className="link" style={{ paddingTop: "20px" }}>
              <p>
                No tienes cuenta?{" "}
                <a href="" onClick={goToSignIn}>
                  Crea una aqui
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
