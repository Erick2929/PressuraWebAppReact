import React, { Component } from "react";
import logo from "../assets/imgs/icon-profile.png";
import "./CardItem.css";

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "selected" in props,
    };
  }
  render() {
    return (
      <div className="card-item">
        <div
          className={"selection " + (this.state.selected ? "selected" : "")}
        ></div>
        <div className="info">
          <img src={logo} height="32px"></img>
          <span>
            {this.props.firstName}
            <br />
            {this.props.lastName}
          </span>
        </div>
      </div>
    );
  }
}

export default CardItem;
