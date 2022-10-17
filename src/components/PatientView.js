import NavBar from "./NavBar";
import PatientCard from "./PatientCard";
import PatientProfileCard from "./PatientProfileCard";
import GraphCard from "./GraphCard";
import "./PatientView.css";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const PatientView = ({ selectedEmail }) => {
  const [patientData, setpatientData] = useState({});

  useEffect(() => {
    const getPatientData = async () => {
      const doctorsCollectionRef = collection(db, "Paciente");
      const doctorQuery = query(
        doctorsCollectionRef,
        where("IDPaciente", "==", selectedEmail)
      );
      const doctorSnap = await getDocs(doctorQuery);
      setpatientData(
        doctorSnap.size > 0 ? createPatientData(doctorSnap.docs[0].data()) : {}
      );
    };
    getPatientData();
  }, []);

  const createPatientData = (data) => {
    return {
      id: selectedEmail,
      name: data.Nombre == undefined ? "Indefinido" : data.Nombre,
      sex:
        data.Sexo == undefined
          ? "Indefinido"
          : data.Sexo == 1
          ? "Masculino"
          : "Femenino",
      height: data.Altura == undefined ? "Indefinido" : data.Altura,
      weight: data.Peso == undefined ? "Indefinido" : data.Peso,
      date:
        data.FechaNacimiento == undefined
          ? new Date()
          : data.FechaNacimiento.toDate(),
      age:
        data.FechaNacimiento == undefined
          ? "Indefinido"
          : 2022 - data.FechaNacimiento.toDate().getFullYear(),
      dateString:
        data.FechaNacimiento == undefined
          ? "Indefinido"
          : data.FechaNacimiento.toDate().toLocaleDateString(),
    };
  };

  return (
    <div className="app">
      <NavBar></NavBar>
      <div className="content">
        <PatientProfileCard
          name={patientData.name}
          age={patientData.age}
          sex={patientData.sex}
          height={patientData.height}
          weight={patientData.weight}
          date={patientData.dateString}
          email={patientData.id}
        />
        <PatientCard>
          <GraphCard paciente={selectedEmail} />
        </PatientCard>
      </div>
    </div>
  );
};

export default PatientView;
