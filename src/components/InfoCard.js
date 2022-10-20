import Card from "./Card";
import ProgressBar from "./ProgressBar";
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

  const getLatestHabits = (snap) => {
    if (snap.size == 0)
      return {
        exercise: 0,
        medicine: 0,
        food: 0,
      };
    const arr = [];
    snap.forEach((habits) => {
      habits = habits.data();
      arr.push({
        seconds: habits.Fecha.seconds,
        exercise: habits.Ejercicio,
        medicine: habits.Medicamentos,
        food: habits.RegimenAlimenticio,
      });
    });
    const res = [...arr].sort((a, b) => a.seconds - b.seconds);
    return res[0];
  };

  const readUser = async () => {
    const snap = await getDocs(
      query(collection(db, "Paciente"), where("IDPaciente", "==", selectedId))
    );
    if (snap.size != 1) {
      setUserData({});
      return;
    }
    const snapHabits = await getDocs(
      query(collection(db, "Habitos"), where("IDPaciente", "==", selectedId))
    );
    const habitsData = getLatestHabits(snapHabits);
    const user = snap.docs[0].data();
    const data = {
      id: selectedId,
      name: user.Nombre == undefined ? "Indefinido" : user.Nombre,
      sex:
        user.Sexo == undefined
          ? "Indefinido"
          : user.Sexo == 1
          ? "Masculino"
          : "Femenino",
      height: user.Altura == undefined ? "Indefinido" : user.Altura,
      weight: user.Peso == undefined ? "Indefinido" : user.Peso,
      date:
        user.FechaNacimiento == undefined
          ? new Date()
          : user.FechaNacimiento.toDate(),
      age:
        user.FechaNacimiento == undefined
          ? "Indefinido"
          : 2022 - user.FechaNacimiento.toDate().getFullYear(),
      dateString:
        user.FechaNacimiento == undefined
          ? "Indefinido"
          : user.FechaNacimiento.toDate().toLocaleDateString(),
      lastExercise:
        habitsData.exercise == undefined
          ? 0
          : habitsData.exercise,
      lastMedicine:
        habitsData.medicine == undefined
          ? 0
          : habitsData.medicine,
      lastFood:
        habitsData.food == undefined
          ? 0
          : habitsData.food,
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
        <img className="icon-profile" src={profile} width="25%" />
        <h3>{userData.name}</h3>
        <ul className="data-labels">
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
        <ul className="data-habits">
          <li>
            <span className="title">Medicamento</span>
            <ProgressBar value={userData.lastMedicine} />
          </li>
          <li>
            <span className="title">Ejercicio</span>
            <ProgressBar value={userData.lastExercise} />
          </li>
          <li>
            <span className="title">Alimentación</span>
            <ProgressBar value={userData.lastFood} />
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
