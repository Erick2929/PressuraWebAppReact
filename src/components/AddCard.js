import React, { useEffect, useState } from "react";
import Card from "./Card";
import InputElement from "./InputElement";
import "./AddCard.css";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import RequestItem from "./RequestItem";

const AddCard = ({ onClickModalFade, onClickRequest }) => {
  const Sections = {
    CreateNew: 0,
    Requests: 1,
  };
  const [section, setSection] = useState(Sections.CreateNew);
  const [patientID, setPatientID] = useState("");
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
      if (userSession === null) return;
      setUser(userSession.email);
    });
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      const reqRef = collection(db, "PacienteConDoctores");
      const q = query(
        reqRef,
        where("IDDoctor", "==", user),
        where("Relacion", "==", 1)
      );
      const snap = await getDocs(q);
      const arr = [];
      snap.forEach((data) => {
        arr.push({
          docID: data.id,
          id: data.data().IDPaciente,
          name: data.data().NombrePaciente,
        });
      });
      setRequests(arr);
    };
    asyncFunc();
  }, [user]);

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

  const onClickDeny = (docID) => {
    onClickRequest(true, {
      text: "¿Estás seguro que quieres eliminar la solicitud?",
      title: "Eliminar Solicitud",
      accept: false,
      requestID: docID,
      doctorID: user,
    });
  }
  const onClickAccept = (docID) => {
    onClickRequest(true, {
      text: "¿Estás seguro que quieres aceptar la solicitud?",
      title: "Aceptar Solicitud",
      accept: true,
      requestID: docID,
      doctorID: user,
    });
  }

  return (
    <div
      className="modal-fade"
      onMouseUp={(e) => closeModal(e, onClickModalFade)}
    >
      <Card className="add-card">
        <ul className="list-sections">
          <li className={section === Sections.CreateNew ? "selected" : ""}>
            <a href="#" onClick={() => setSection(Sections.CreateNew)}>
              Crear Nuevo
            </a>
          </li>
          <li className={section === Sections.Requests ? "selected" : ""}>
            <a href="#" onClick={() => setSection(Sections.Requests)}>
              Solicitudes
            </a>
          </li>
        </ul>
        <div className="body">
          {section === Sections.CreateNew && (
            <>
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
            </>
          )}
          {section === Sections.Requests && requests.length != 0 &&
            requests.map((req, i) => {
              return (
                <RequestItem
                  key={i}
                  name={req.name}
                  email={req.id}
                  onClickDeny={() => onClickDeny(req.docID)}
                  onClickAccept={() => onClickAccept(req.docID)}
                />
              );
            })}
          {section === Sections.Requests && requests.length == 0 && (
            <p style={{color: "grey", textAlign: "center"}}>No existen solicitudes, actualmente.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AddCard;
