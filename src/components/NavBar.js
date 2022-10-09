import { useState } from "react";
import logo from "../assets/imgs/pressura-logo-white.png";
import profile from "../assets/imgs/icon-profile.svg";
import ProfileCard from "./ProfileCard";

const NavBar = () => {
  const [profileOpened, setProfileOpened] = useState(false);

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <img src={logo} height="32px"></img>
      </a>
      <ul>
        <li>
          <a href="#">Cerrar Sesión</a>
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
