import React, { useState } from "react";
import NavBar from "../components/NavBar";
import PatientsCard from "../components/PatientsCard";
import InfoCard from "../components/InfoCard";
import "../styles.css";
import AddCard from "./AddCard";
import ConfirmCard from "./ConfirmCard";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const MainView = ({
  onClickCardItem,
  selectedUser,
  selectedId,
  INVALID_INDEX,
}) => {
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const showAddModal = () => {
    setIsAddingPatient(true);
  };
  const hideAddModal = () => {
    setIsAddingPatient(false);
  };
  const logOut = () => {
    signOut(auth);
    window.location.assign("/");
    alert("Sesión cerrada con éxito.");
  };

  return (
    <div className="app">
      <NavBar onClickLogout={() => setIsSigningOut(true)}></NavBar>
      <div className="content">
        <PatientsCard
          selectedUser={selectedUser}
          onClickCardItem={onClickCardItem}
          onClickAdd={showAddModal}
        ></PatientsCard>
        <InfoCard
          selectedUser={selectedUser}
          selectedId={selectedId}
          INVALID_INDEX={INVALID_INDEX}
        ></InfoCard>
      </div>
      {isAddingPatient && <AddCard onClickModalFade={hideAddModal} />}
      {isSigningOut && (
        <ConfirmCard
          title="Cerrar Sesión"
          onClickConfirm={logOut}
          onClickCancel={() => setIsSigningOut(false)}
        >
          ¿Estás seguro que quieres cerrar sesión?
        </ConfirmCard>
      )}
    </div>
  );
};

export default MainView;
