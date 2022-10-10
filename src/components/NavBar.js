import { useEffect, useState } from "react";
import logo from "../assets/imgs/pressura-logo-white.png";
import profile from "../assets/imgs/icon-profile.svg";
import ProfileCard from "./ProfileCard";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [profileOpened, setProfileOpened] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
        if(userSession !== null){
          setUser(userSession.email)
          console.log(user.email,' ha entrado a main view')
        }
        else{
            console.log('no hay cuenta logeada ')
        }
    })
  },[])

  const logout = async () => {
    console.log('salio de la cuenta')
    alert('Has salido de la cuenta')
    await signOut(auth);
    setUser('Has salido de la cuenta')
  }

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <img src={logo} height="32px"></img>
      </a>
      <ul>
        <li>
          <a href="/" onClick={logout} >Cerrar Sesión</a>
          {profileOpened && <ProfileCard />}
        </li>
        <li>
          <a href="#"  onClick={() => setProfileOpened(!profileOpened)}>
            <img src={profile} height="32px"></img>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
