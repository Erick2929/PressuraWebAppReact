import React from "react";
import no from "../assets/imgs/icon-no.svg";
import yes from "../assets/imgs/icon-yes.svg";
import "./RequestItem.css";

const RequestItem = ({ name, email, onClickDeny, onClickAccept }) => {
  return (
    <div className="request-item">
      <div className="data">
        <p>{name}</p>
        <p className="data-email">{email}</p>
      </div>
      <ul>
        <li>
          <a href="#" onClick={onClickDeny}>
            <img className="deny" src={no} />
          </a>
        </li>
        <li>
          <a href="#" onClick={onClickAccept}>
            <img className="accept" src={yes} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default RequestItem;
