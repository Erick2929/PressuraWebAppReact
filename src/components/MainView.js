import React, { useState } from "react";
import NavBar from "../components/NavBar";
import PatientsCard from "../components/PatientsCard";
import InfoCard from "../components/InfoCard";
import "../styles.css";

const MainView = ({onClickCardItem, selectedUser, selectedId, INVALID_INDEX}) => {
  return (
    <div className="app">
      <NavBar></NavBar>
      <div className="content">
        <PatientsCard
          selectedUser={selectedUser}
          onClickCardItem={onClickCardItem}
        ></PatientsCard>
        <InfoCard
          selectedUser={selectedUser}
          selectedId={selectedId}
          INVALID_INDEX={INVALID_INDEX}
        ></InfoCard>
      </div>
    </div>
  );
};

export default MainView;
