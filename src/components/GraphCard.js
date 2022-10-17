import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { LineChart , AreaChart, Area, Line , XAxis , YAxis , CartesianGrid , Tooltip , Legend } from 'recharts'
import { db } from '../firebase';
import { CSVLink } from 'react-csv';



const GraphCard = ({paciente}) =>{
  const [users, setUsers] = useState([]);
  const [dataCSV, setdataCSV] = useState([]);
  const [sistolicP, setsistolicP] = useState([]);
  const [distolicP, setdistolicP] = useState([]);
  const [sistolicDev, setSistolicDev] = useState(0);
  const [distolicDev, setDistolicDev] = useState(0);
  const [dAvg, setdAvg] = useState(0);
  const [sAvg, setsAvg] = useState(0);


  const buildUsers = (users) => {
    let arr = [];
    users.forEach((user) => {
      user = user.data();
      arr.push({
        fecha: user.Fecha.toDate().toDateString(),
        sistolica: user.MedidaSuperior,
        diastolica: user.MedidaInferior
      });
    });
    return arr;
  };
  const buildUsersCSV = (users) => {
    let arr = [];
    users.forEach((user) => {
      user = user.data();
      arr.push({
        fecha: user.Fecha.toDate(),
        sistolica: user.MedidaSuperior,
        diastolica: user.MedidaInferior,
        Estado_Emocional: user.EstadoEmocional,
        Relajado: user.Relajado
      });
    });
    return arr;
  };
  const buildStdDevSis = (users) => {
    let arr = [];
    users.forEach((user) => {
      user = user.data();
      arr.push(user.MedidaSuperior);
    });
    return arr;
  };
  const buildStdDevDis = (users) => {
    let arr = [];
    users.forEach((user) => {
      user = user.data();
      arr.push(user.MedidaInferior);
    });
    return arr;
  };

  const readBloodP = async () => {
    const snap = await getDocs(
      query(
        collection(db, "Presion"),
        where("IDPaciente", "==", paciente)
      )
    );
    setUsers(buildUsers(snap));
    setdataCSV(buildUsersCSV(snap))
    setdistolicP(buildStdDevDis(snap));
    setsistolicP(buildStdDevSis(snap));
    setSistolicDev(getStandardDeviation(sistolicP))
    setDistolicDev(getStandardDeviation(distolicP))
    setsAvg(mean(sistolicP))
    setdAvg(mean(distolicP))
  };

  function mean(array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return mean
  }

  function getStandardDeviation (array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }

  useEffect(() => {
    readBloodP();
  }, []);


  return (
    <div className="chart-content">
      
        <p>Desviacion Estandar: {distolicDev} (diastolica)  ||  Media: {dAvg}</p>
        <p>Desviacion Estandar: {sistolicDev} (sistolica)  ||  Media: {sAvg}</p>

        <AreaChart width={1500} height={500} data={users}
        margin={{ top: 0, right: 10, left: 10, bottom: 10 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="fecha" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="sistolica" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="diastolica" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>

      <CSVLink
        data={dataCSV}
        filename={"my-file.csv"}
        className="btn btn-primary"
        target="_blank"
      >
        <button className="boton-csv" >Descargar CSV</button>
      </CSVLink>

    </div>
  )
}

export default GraphCard;
