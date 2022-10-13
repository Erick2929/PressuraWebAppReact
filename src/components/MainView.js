import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import PatientsCard from '../components/PatientsCard'
import InfoCard from '../components/InfoCard'
import '../styles.css'


export default function MainView() {
  const INVALID_INDEX = -1;
  const [selectedUser, setSelectedUser] = useState(INVALID_INDEX);
  const [selectedId, setSelectedId] = useState("");

  const selectUser = (index, userId) => {
    setSelectedId(selectedUser == index ? "" : userId);
    setSelectedUser(selectedUser == index ? -1 : index);
  }
  
  return (
    <div className="app">
      <NavBar></NavBar>
      <div className="content">
        <PatientsCard selectedUser={selectedUser} onClickCardItem={selectUser}></PatientsCard>
        <InfoCard selectedUser={selectedUser} selectedId={selectedId}></InfoCard>
      </div>
    </div>
  )
}
