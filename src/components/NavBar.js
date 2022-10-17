import { useEffect, useState } from "react";
import logo from "../assets/imgs/pressura-logo-white.png";
import profile from "../assets/imgs/icon-profile.svg";
import ProfileCard from "./ProfileCard";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const NavBar = ({ onClickLogout }) => {
  const [profileOpened, setProfileOpened] = useState(false);
  const [user, setUser] = useState("");
  const [doctorData, setDoctorData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
      if (userSession !== null) {
        setUser(userSession.email);
      }
    });
  }, []);

  useEffect(() => {
    const getDoctorData = async () => {
      const doctorsCollectionRef = collection(db, "Doctor");
      const doctorQuery = query(
        doctorsCollectionRef,
        where("IDDoctor", "==", user)
      );
      const doctorSnap = await getDocs(doctorQuery);
      setDoctorData(doctorSnap.size > 0 ? doctorSnap.docs[0].data() : {});
    };
    getDoctorData();
  }, [user]);

  return (
    <nav className="navbar">
      <a href="/mainView" className="navbar-logo">
        <img src={logo} height="32px"></img>
      </a>
      <ul>
        <li>
          <a href="#" onClick={onClickLogout}>
            Cerrar Sesión
          </a>
          {profileOpened && (
            <ProfileCard name={doctorData.Nombre} email={user} />
          )}
        </li>
        <li>
          <a href="#" onClick={() => setProfileOpened(!profileOpened)}>
            <img src={profile} height="32px"></img>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
