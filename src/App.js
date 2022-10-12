import './App.css';
import LoginForm from './components/LoginForm'
import Register from './components/Register';
import NavBar from './components/NavBar'
import PatientsCard from './components/PatientsCard'
import InfoCard from './components/InfoCard'
import MainView from './components/MainView';
import { Route, Routes } from 'react-router-dom'
import RegisterData from './components/RegisterData';
import PatientView from './components/PatientView';
function App() {


  return ( 
    <Routes>
      <Route path='/' element={<LoginForm></LoginForm>} ></Route>
      <Route path='/signin' element={<Register></Register>} ></Route>
      <Route path='/mainView' element={<MainView></MainView>} ></Route>
      <Route path='/register-data' element={<RegisterData></RegisterData>} ></Route>
      <Route path='/patientView' element={<PatientView />} ></Route>
    </Routes>
  );
}

export default App;
