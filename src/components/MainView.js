import React from 'react'
import NavBar from '../components/NavBar'
import PatientsCard from '../components/PatientsCard'
import InfoCard from '../components/InfoCard'
import '../styles.css'


export default function MainView() {

  return (
    <div className="app">
      <NavBar></NavBar>
      <div className="content">
        <PatientsCard></PatientsCard>
        <InfoCard></InfoCard>
      </div>
    </div>
  )
}
