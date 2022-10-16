import profile from "../assets/imgs/icon-profile.svg";
import Card from "./Card";
import "./PatientProfileCard.css";

const PatientProfileCard = ({name}) => {
  return (
    <Card className="patient-profile-card">
      <img src={profile} width="60%" />
      <h3>{name}</h3>
      <ul>
        <li className="title">Edad</li>
        <li>21</li>
        <li className="title">Peso</li>
        <li>65kg</li>
        <li className="title">Teléfono</li>
        <li>(000) 000 00 00</li>
      </ul>
    </Card>
  );
};

export default PatientProfileCard;
