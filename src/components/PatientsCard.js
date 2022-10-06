import React from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import SearchBar from "./SearchBar";

const PatientsCard = () => {
  return (
    <Card>
      <SearchBar />
      <CardItem
        firstName="Jorge Claudio"
        lastName="González Becerril"
        selected
      />
      <CardItem firstName="Karym" lastName="García Lopez" />
    </Card>
  );
};

export default PatientsCard;
