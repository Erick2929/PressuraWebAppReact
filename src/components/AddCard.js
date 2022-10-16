import React, { useEffect, useState } from "react";
import Card from "./Card";
import InputElement from "./InputElement";
import "./AddCard.css";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AddCard = ({ onClickModalFade }) => {
  const Sections = {
    CreateNew: 0,
    Token: 1,
  };
  const [section, setSection] = useState(Sections.CreateNew);
  const [patientID, setPatientID] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
      if (userSession === null) return;
      setUser(userSession.email);
    });
  }, []);

  const closeModal = (e, onClickModalFade) => {
    if (!e.target.classList.contains("modal-fade")) return;
    onClickModalFade();
  };

  const createUser = async () => {
    setPatientID(patientID.trim());
    if (
      patientID === "" ||
      user === "" ||
      !patientID.includes("@") ||
      patientID.includes(" ")
    )
      return;
    const collectionRef = collection(db, "PacienteConDoctores");
    const q = query(
      collectionRef,
      where("IDPaciente", "==", patientID),
      where("IDDoctor", "==", user)
    );
    const snap = await getDocs(q);
    if (snap.size == 0) {
      const doctorsCollectionRef = collection(db, "Doctor");
      const doctorQuery = query(
        doctorsCollectionRef,
        where("IDDoctor", "==", user)
      );
      const doctorSnap = await getDocs(doctorQuery);
      const doctorName =
        doctorSnap.size > 0 ? doctorSnap.docs[0].data().Nombre : "";
      await addDoc(collectionRef, {
        IDDoctor: user,
        IDPaciente: patientID,
        NombreDoctor: doctorName,
        NombrePaciente: "",
        Relacion: 2,
      });
    }
    onClickModalFade();
  };

  return (
    <div
      className="modal-fade"
      onMouseUp={(e) => closeModal(e, onClickModalFade)}
    >
      <Card className="add-card">
        <ul className="list-sections">
          <li>
            <a href="#" onClick={() => setSection(Sections.CreateNew)}>
              Crear Nuevo
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setSection(Sections.Token)}></a>
          </li>
        </ul>
        <div className="body">
          <InputElement
            title="Correo Electrónico (Paciente)"
            inputValue={patientID}
            onChangeInput={setPatientID}
            autoComplete="off"
          />
          <ul className="list-buttons">
            <li className="button-create" onClick={createUser}>
              <a href="#">Crear</a>
            </li>
            <li className="button-cancel" onClick={onClickModalFade}>
              <a href="#">Cancelar</a>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AddCard;
