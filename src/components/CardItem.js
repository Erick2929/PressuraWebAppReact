import logo from "../assets/imgs/icon-profile.png";
import "./CardItem.css";

const CardItem = ({ firstName, lastName, selected }) => {
  return (
    <div className="card-item">
      <div className={"selection " + (selected ? "selected" : "")}></div>
      <div className="info">
        <img src={logo} height="32px"></img>
        <span>
          {firstName}
          <br />
          {lastName}
        </span>
      </div>
    </div>
  );
};

CardItem.defaultProps = {
  selected: false,
};

export default CardItem;
