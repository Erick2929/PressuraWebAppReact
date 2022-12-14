import { useEffect, useState } from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import SearchBar from "./SearchBar";
import "./PatientsCard.css";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const PatientsCard = ({ selectedUser, onClickCardItem, onClickAdd }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sessionEmail, setSessionEmail] = useState("");

  const buildUsers = (users) => {
    let arr = [];
    users.forEach((user) => {
      user = user.data();
      arr.push({
        id: user.IDPaciente,
        name: user.NombrePaciente,
      });
    });
    return arr;
  };

  const readUsers = async (doctorEmail) => {
    const snap = await getDocs(
      query(
        collection(db, "PacienteConDoctores"),
        where("IDDoctor", "==", doctorEmail),
        where("Relacion", "==", 3)
      )
    );
    setUsers(buildUsers(snap));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
      if (userSession !== null) {
        setSessionEmail(userSession.email);
        readUsers(userSession.email);
      } else {
        console.alert("No estás conectado ha una cuenta.");
      }
    });
  }, []);

  return (
    <Card className="patients-card">
      <SearchBar onClickSearch={setSearch} onClickAdd={onClickAdd} />
      <div className="items">
        {users.map((user, index) => {
          if (!user.name.toLowerCase().startsWith(search)) return;
          return (
            <CardItem
              firstName={user.name}
              lastName={user.id}
              selected={index === selectedUser ? true : false}
              key={index}
              onClick={() => onClickCardItem(index, user.id)}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default PatientsCard;
