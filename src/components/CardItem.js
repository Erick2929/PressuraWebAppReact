import logo from "../assets/imgs/icon-profile.png";
import "./CardItem.css";

const CardItem = ({ firstName, lastName, selected, onClick }) => {
  return (
    <div className="card-item" onClick={onClick}>
      <div className={"selection " + (selected ? "selected" : "")}></div>
      <div className="info">
        <img src={logo} height="32px"></img>
        <span>
          {firstName}
          <br />
          <span className="subtext">{lastName}</span>
        </span>
      </div>
    </div>
  );
};

CardItem.defaultProps = {
  selected: false,
};

export default CardItem;
