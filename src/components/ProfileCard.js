import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import profile from "../assets/imgs/icon-profile.svg";
import { auth, db } from "../firebase";
import Card from "./Card";
import "./ProfileCard.css";

const ProfileCard = ({ ref }) => {

  const [user, setUser] = useState('');
  const [userUid, setUserUid] = useState('');
  const [userName, setUserName] = useState('');

  

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
        if(userSession !== null){
          setUser(userSession.email)
          setUserUid(userSession.uid)
          console.log(userSession.email,' ha entrado a main view')
          console.log(userSession.uid,' <- Uid')
          //console.log(userUid,' <- Uid1')
        }
        else{
            console.log('no hay cuenta logeada ')
        }
    })
    
  },[])
/*
  const docRef = doc(db, "Doctor", userUid , 'Nombre');
 

  const readUsers = async () => {
    const docSnap = await getDoc(docRef);
    setUserName(docSnap);
    console.log(docSnap, '<- este es el nombre')
  }
 */
  return (
    <Card className="profile-card" ref={ref}>
      <img src={profile} width="60%" />
      <h3>{user}</h3>
      <ul>
      <li className="title">Nombre</li>
        <li>(000) 000 00 00</li>
        <li className="title">Teléfono</li>
        <li>(000) 000 00 00</li>
        <li className="title">Consultoria</li>
        <li>Calle Colonia 000 Ciudad</li>
      </ul>
      <a href="#">Editar</a>
    </Card>
  );
};

export default ProfileCard;
