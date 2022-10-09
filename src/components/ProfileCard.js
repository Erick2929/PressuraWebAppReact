import profile from "../assets/imgs/icon-profile.svg";
import Card from "./Card";
import "./ProfileCard.css";

const ProfileCard = ({ ref }) => {
  return (
    <Card className="profile-card" ref={ref}>
      <img src={profile} width="60%" />
      <h3>Pilar Taboada Domingo</h3>
      <ul>
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
