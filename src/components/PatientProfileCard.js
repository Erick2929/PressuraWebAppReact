import profile from "../assets/imgs/icon-profile.svg";
import Card from "./Card";
import "./PatientProfileCard.css";

const PatientProfileCard = ({
  name,
  age,
  height,
  weight,
  sex,
  date,
  email,
}) => {
  return (
    <Card className="patient-profile-card">
      <img src={profile} width="60%" />
      <h3>{name}</h3>
      <ul>
        <li className="title">Edad</li>
        <li>{age}</li>
        <li className="title">Altura</li>
        <li>{height}</li>
        <li className="title">Peso</li>
        <li>{weight}</li>
        <li className="title">Sexo</li>
        <li>{sex}</li>
        <li className="title">Fecha de Nacimiento</li>
        <li>{date}</li>
        <li className="title">Correo Electrónico</li>
        <li>{email}</li>
      </ul>
    </Card>
  );
};

export default PatientProfileCard;
