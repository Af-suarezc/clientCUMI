import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "./formclassroom.css"

export default function FormClassRoom() {
  const [inputs, setInputs]=useState({
    "classname":"",
    "horario":"",
    "grado":""
  });

  //opciones disponibles:
  const optionsList =["Kinder", "Jardin", "Primero", "Segundo", "Tercero", "Cuarto", "Quinto"];
  const [error, setError]=useState(null);
  const [successMsg, setSuccessMsg]=useState(null);
  const handleChange= e =>{
     setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }
  console.log(inputs);
  const handleClick = async e =>{
    e.preventDefault()
    try {
        let registerClass = await axios.post('http://localhost:8080/api/room/createclass', inputs);
        if (registerClass.status == 200) {
          console.log("Exito en el registro clase");
          console.log(registerClass);
          setSuccessMsg(registerClass.data);
          setInputs({
            classname: "",
            horario: "",
            grado: ""
          });
        }

    } catch (error) {
        setError(error.response.data);
    }

  }

return (
  <div>
      <div className="wrapper">
      <h1>Registra la información del Salon</h1>
      <br/>
      <br/>
        <form className="classformroom">
          <label htmlFor="classname">Nombre de la Clase:</label>
          <input
            type="text"
            placeholder="Nombre de la clase"
            name="classname"
            onChange={handleChange}
            value={inputs.classname}
          />
          <label htmlFor="horario">Intensidad Semanal</label>
          <input
            type="text"
            placeholder="Horas a la semana"
            name="horario"
            onChange={handleChange}
            value={inputs.horario}
          />
          <label htmlFor="grado">Grado:</label>
          <input
            type="text"
            placeholder="Grado"
            name="grado"
            onChange={handleChange}
            list="options"
            value={inputs.grado}
          />
          <datalist id="options">
           {optionsList.map((option, index) => (
             <option key={index} value={option} />
            ))}
          </datalist>
          {error && <p>{error}</p>}
          {successMsg && <h4>{successMsg}!!</h4>}
          <button onClick={handleClick} >Agregar</button>
        </form>
        <br />
        <Link to="/userlogged">
          <button className="backhomebuttonroom">BackHome</button>
        </Link>
      </div>
  </div>
)
}
