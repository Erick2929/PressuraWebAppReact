import Card from "./Card";
import missing from "../assets/imgs/icon-missing.svg";
import profile from "../assets/imgs/icon-profile.svg";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InfoCard.css";

const InfoCard = ({ selectedUser, selectedId, INVALID_INDEX }) => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const readUser = async () => {
    const snap = await getDocs(
      query(collection(db, "Paciente"), where("IDPaciente", "==", selectedId))
    );
    if (snap.size != 1) {
      setUserData({});
      return;
    };
    const user = snap.docs[0].data();
    const data = {
      id: selectedId,
      name: user.Nombre == undefined ? "Indefinido" : user.Nombre,
      sex: user.Sexo == undefined ? "Indefinido" : (user.Sexo == 1 ? "Masculino" : "Femenino"),
      height: user.Altura == undefined ? "Indefinido" : user.Altura,
      weight: user.Peso == undefined ? "Indefinido" : user.Peso,
      date: user.FechaNacimiento == undefined ? new Date() : user.FechaNacimiento.toDate(),
      age: user.FechaNacimiento == undefined ? "Indefinido" : 2022 - user.FechaNacimiento.toDate().getFullYear(),
      dateString: user.FechaNacimiento == undefined ? "Indefinido" : user.FechaNacimiento.toDate().toLocaleDateString(),
    };
    setUserData(data);
  };

  if (selectedUser === INVALID_INDEX) {
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
            {userData.age}
          </li>
          <li>
            <span className="title">Peso</span>
            <br />
            {userData.weight} kg.
          </li>
          <li>
            <span className="title">Altura</span>
            <br />
            {userData.height} m.
          </li>
          <li>
            <span className="title">Sexo</span>
            <br />
            {userData.sex}
          </li>
          <li>
            <span className="title">Fecha de Nacimiento</span>
            <br />
            {userData.dateString}
          </li>
          <li>
            <span className="title">Correo Electrónico</span>
            <br />
            {userData.id}
          </li>
        </ul>
      </div>
      <a href="#" onClick={() => navigate("/patientView")}>
        <p className="button">Ver más</p>
      </a>
    </Card>
  );
};

InfoCard.defaultProps = {
  user: {},
};

export default InfoCard;
