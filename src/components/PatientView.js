import NavBar from "./NavBar";
import PatientCard from "./PatientCard";
import PatientProfileCard from "./PatientProfileCard";
import './PatientView.css'

const PatientView = () => {
  return (
    <div className="app">
      <NavBar></NavBar>
      <div className="content">
        <PatientProfileCard />
        <PatientCard />
      </div>
    </div>
  );
};

export default PatientView;
