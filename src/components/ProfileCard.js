import profile from "../assets/imgs/icon-profile.svg";
import Card from "./Card";
import "./ProfileCard.css";

const ProfileCard = ({ name, email }) => {
  return (
    <Card className="profile-card">
      <img src={profile} width="60%" />
      <h3>{name}</h3>
      <ul>
        <li className="title">Correo Electrónico</li>
        <li>{email}</li>
      </ul>
    </Card>
  );
};

export default ProfileCard;
