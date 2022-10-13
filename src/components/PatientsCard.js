import { useEffect, useState } from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import SearchBar from "./SearchBar";
import "./PatientsCard.css";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase";

const PatientsCard = ({ selectedUser, onClickCardItem }) => {
  const [users, setUsers] = useState([]);

  const buildUsers = (users) => {
    let arr = [];
    users.forEach(user => {
      user = user.data();
      arr.push({
        id: user.IDPaciente,
        name: user.NombrePaciente,
      })
    });
    return arr;
  }
  
  const readUsers = async () => {
    const snap = await getDocs(query(collection(db, "PacienteConDoctores"), where("IDDoctor", "==", "pato02@ejemplo.com"), where("Relacion", "==", 3)));
    setUsers(buildUsers(snap));
  }
  
  useEffect(() => {
    readUsers();
  }, []);

  return (
    <Card className="patients-card">
      <SearchBar />
      <div className="items">
        {users.map((user, index) => {
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
