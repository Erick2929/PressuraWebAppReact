import NavBar from "./NavBar";
import PatientCard from "./PatientCard";
import PatientProfileCard from "./PatientProfileCard";
import GraphCard from "./GraphCard";
import './PatientView.css'
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const PatientView = ({selectedEmail}) => {

  const [patientData, setpatientData] = useState({})

  useEffect(() => {
    const getPatientData = async () => {
      const doctorsCollectionRef = collection(db, "Paciente");
      const doctorQuery = query(
        doctorsCollectionRef,
        where("IDPaciente", "==", selectedEmail)
      );
      console.log(selectedEmail)
      const doctorSnap = await getDocs(doctorQuery);
      setpatientData(doctorSnap.size > 0 ? doctorSnap.docs[0].data() : {});
    };
    getPatientData();
  }, []);

  return (
    <div className="app">
      <NavBar></NavBar>
      <div className="content">
        <PatientProfileCard name={patientData.Nombre}/>
        <PatientCard />
        <GraphCard/>
      </div>
    </div>
  );
};

export default PatientView;
