import { useState } from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import SearchBar from "./SearchBar";
import "./PatientsCard.css";

const PatientsCard = () => {
  const [selected, setSelected] = useState(0);

  const users = [
    { firstName: "Roberto", lastName: "Perez Iga" },
    { firstName: "Erick", lastName: "Siller" },
    { firstName: "Jorge Claudio", lastName: "González Becerril" },
    { firstName: "Diego", lastName: "Piñones Besnier" },
  ];

  return (
    <Card className="patients-card">
      <SearchBar />
      <div className="items">
        {users.map((user, index) => {
          return (
            <CardItem
              firstName={user.firstName}
              lastName={user.lastName}
              selected={index === selected ? true : false}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default PatientsCard;
