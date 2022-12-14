import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
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
  const [relajado, setRelajado] = useState('')
  const [noSePuedeCalcular, setnoSePuedeCalcular] = useState(false)

  const buildUsers = (users) => {
    let arr = [];
    users.forEach((user) => {
      user = user.data();
      //console.log('FEchaaa--> ',user.Fecha.seconds)
      arr.push({
        seconds: user.Fecha.seconds,
        fecha: user.Fecha.toDate().toDateString(),
        sistolica: user.MedidaSuperior.toFixed(2),
        diastolica: user.MedidaInferior.toFixed(2),
        relajado: user.RelajadoTool
      });
    });
    const numAscending = [...arr].sort((a, b) => a.seconds - b.seconds);
    console.log(numAscending);
    return numAscending;
  };
  const buildUsersCSV = (users) => {
    let arr = [];
    users.forEach((user) => {
      user = user.data();
      arr.push({
        FechaEnSegundos: user.Fecha.seconds,
        fecha: user.Fecha.toDate(),
        sistolica: user.MedidaSuperior,
        diastolica: user.MedidaInferior,
        Estado_Emocional: user.EstadoEmocional,
        Relajado: user.Relajado
      });
    });
    const numAscending = [...arr].sort((a, b) => a.FechaEnSegundos - b.FechaEnSegundos);
    console.log(numAscending);
    return numAscending;
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

  const calcularDesviaciones = () => {
    if(sistolicP.length != 0){
      setSistolicDev(getStandardDeviation(sistolicP))
      setDistolicDev(getStandardDeviation(distolicP))
      setsAvg(mean(sistolicP))
      setdAvg(mean(distolicP))
    }
    else{
      setnoSePuedeCalcular(true)
    }
  }

  useEffect(() => {
    readBloodP();
  }, []);

  const getIntroOfPage = (value) => {
    if (value === 0) {
      setRelajado('#f55858')
      return "No";
    }
    if (value === 1) {
      setRelajado('#58f57a')
      return "Si";
    }
    return '';
  };
  
  

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={
          {
            backgroundColor: '#ffffff',
            padding: '10px',
            borderRadius:'10px',
            border: 'solid',
            borderColor: '#cacaca'
          }
          }>
          <p style={{
            color: '#464646',
            fontWeight: 'bold'
          }}>{`Fecha: ${label}`}</p>
          <p style={{ color: '#8884d8' }}>{`Sistolica: ${payload[0].value}`}</p>
          <p style={{color: '#82ca9d'}} >{`Diastolica: ${payload[1].value}`}</p>
          <p style={{color: relajado}}>{`Relajado: ${getIntroOfPage(payload[2].value)}`}</p>
        </div>
      );
    }
  
    return null;
  };



  return (
    <div className="chart-content">
        <button onClick={calcularDesviaciones} style={{cursor: 'pointer'}}>Calcular Desviaci??n</button>
        {noSePuedeCalcular && <p style={{color:'red'}}> La desviacion estandar no puede ser calculada</p> }
        <p>Desviacion Estandar: {distolicDev.toFixed(2)} (diastolica)  ||  Media: {dAvg.toFixed(2)}</p>
        <p>Desviacion Estandar: {sistolicDev.toFixed(2)} (sistolica)  ||  Media: {sAvg.toFixed(2)}</p>

        <AreaChart width={1100} height={500} data={users}
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
        <Tooltip content={ <CustomTooltip /> } />
        <Area type="monotone" dataKey="sistolica" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="diastolica" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        <Area type="monotone" dataKey="relajado" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        

      </AreaChart>

      <CSVLink
        data={dataCSV}
        filename={"my-file.csv"}
        className="btn btn-primary"
        target="_blank"
      >
        <button className="boton-csv" style={{cursor: 'pointer'}}>Descargar CSV</button>
      </CSVLink>

    </div>
  )
}

export default GraphCard;
