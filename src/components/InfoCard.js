import Card from "./Card";
import missing from '../assets/imgs/icon-missing.svg';
import './InfoCard.css'

const InfoCard = ({ user }) => {
  return (
    <Card className="info-card">
        <img src={missing} height="120px" />
        <p>Seleccione a un paciente</p>
    </Card>
  );
};

InfoCard.defaultProps = {
  user: {},
};

export default InfoCard;
