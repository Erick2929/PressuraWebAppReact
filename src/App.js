import "./App.css";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import PatientsCard from "./components/PatientsCard";
import InfoCard from "./components/InfoCard";
import MainView from "./components/MainView";
import { Route, Routes } from "react-router-dom";
import RegisterData from "./components/RegisterData";
import PatientView from "./components/PatientView";
import { useState } from "react";
import AddCard from "./components/AddCard";
function App() {
  const INVALID_INDEX = -1;
  const [selectedUser, setSelectedUser] = useState(INVALID_INDEX);
  const [selectedId, setSelectedId] = useState("");

  const selectUser = (index, userId) => {
    setSelectedId(selectedUser == index ? "" : userId);
    setSelectedUser(selectedUser == index ? -1 : index);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm></LoginForm>}></Route>
      <Route path="/signin" element={<Register></Register>}></Route>
      <Route
        path="/mainView"
        element={
          <MainView
            onClickCardItem={selectUser}
            selectedUser={selectedUser}
            selectedId={selectedId}
            INVALID_INDEX={INVALID_INDEX}
          ></MainView>
        }
      ></Route>
      <Route
        path="/register-data"
        element={<RegisterData></RegisterData>}
      ></Route>
      <Route path="/patientView" element={<PatientView />}></Route>
    </Routes>
  );
}

export default App;
