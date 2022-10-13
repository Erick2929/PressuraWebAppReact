import Card from "./Card";
import missing from "../assets/imgs/icon-missing.svg";
import profile from "../assets/imgs/icon-profile.svg";
import "./InfoCard.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const InfoCard = ({ selectedUser, selectedId }) => {
  const [userData, setUserData] = useState({});

  const readUser = async () => {
    const snap = await getDocs(query(collection(db, "Paciente"), where("IDPaciente", "==", selectedId)));
    if (snap.size != 1) setUserData({});
    const user = snap.docs[0].data();
    const data = {
      id: selectedId,
      name: user.Nombre
    };
    setUserData(data);
  }

  
  if (selectedUser === -1) {
    if (userData.id !== undefined) {
      setUserData({});
    }
    return (
      <Card className="info-card unselected">
        <img src={missing} height="120px" />
        <p>Seleccione a un paciente</p>
      </Card>
    );
  }
  if (userData.id != selectedId) {
    readUser();
  }
  return (
    <Card className="info-card">
      <div>
        <img className="icon-profile" src={profile} width="30%" />
        <h3>{userData.name}</h3>
        <ul>
          <li>
            <span className="title">Edad</span>
            <br />
            21
          </li>
          <li>
            <span className="title">Peso</span>
            <br />
            65 kg.
          </li>
          <li>
            <span className="title">Altura</span>
            <br />
            1.73 m.
          </li>
          <li>
            <span className="title">Sexo</span>
            <br />
            Masculino
          </li>
          <li>
            <span className="title">Fecha de Nacimiento</span>
            <br />
            23 de Marzo de 1950
          </li>
          <li>
            <span className="title">Teléfono</span>
            <br />
            (000) 000 00 00
          </li>
        </ul>
      </div>
      <a href={`/patientView?userId="${selectedId}"`}>
        <p className="button">Ver más</p>
      </a>
    </Card>
  );
};

InfoCard.defaultProps = {
  user: {},
};

export default InfoCard;
