import { useEffect, useState } from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import SearchBar from "./SearchBar";
import "./PatientsCard.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const PatientsCard = () => {
  const [selected, setSelected] = useState(0);
  const [users, setUsers] = useState([]);

  const buildUsers = (users) => {
    let arr = [];
    users.forEach(user => {
      user = user.data();
      arr.push({
        name: user.Nombre,
      })
    });
    return arr;
  }
  
  const readUsers = async () => {
    const snap = await getDocs(collection(db, "Paciente"));
    setUsers(buildUsers(snap));
    console.log(buildUsers(snap))
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
              lastName={user.name}
              selected={index === selected ? true : false}
              key={index}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default PatientsCard;
