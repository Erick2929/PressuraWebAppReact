import back from "../assets/imgs/icon-back.svg";
import Card from "./Card";
import "./PatientCard.css";

const PatientCard = ({children}) => {
  return (
    <Card className="patient-card">
      <a href="/mainView">
        <img src={back} alt="" width="30rem" />
      </a>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere itaque
        natus, distinctio doloribus nesciunt modi consequatur culpa reiciendis
        autem cupiditate officia error eveniet corporis commodi mollitia, ab
        maiores ex at!
      </p>
      {children}
    </Card>
  );
};

export default PatientCard;
