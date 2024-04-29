import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [inputs, setInputs]=useState({
    "username":"",
    "email":"",
    "password":"",
    "name":""
  });

  const [error, setError]=useState(null);
  const handleChange= e =>{
     setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }
  console.log(inputs);
  const handleClick = async e =>{
    e.preventDefault()
    try {
      const allValuesPresent = Object.values(inputs).every(value => value != "");
        if (!allValuesPresent) {
          setError("Todos los campos son obligatorios");
          setTimeout(() => {
            setError(null);
          }, 2500);
          return;
        }
        await axios.post('http://localhost:8080/api/auth/register', inputs);
    } catch (error) {
        setError(error.response.data);
    }
  }
  return (
    <div className="mainlogin">
      <div className="formbanner">
       <h1>Registro de Usuarios CUMI</h1>
      </div>
      <form className="formclass">
        <div className="forminputs">
          <label htmlFor="username">Nombre usuario:</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <label htmlFor="email">Correo usuario:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña usuario:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="name">Nombre usuario:</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
          {error && <label className="errormessage">{error}</label>}
        </div>
        {/* <button onClick={handleClick}>Register</button> */}
        <div className="formbuttons">
          <button onClick={handleClick}>Registrar Usuario</button>
          <Link to="/">
            <button>Regresar a principal </button>
          </Link>
        </div>
      </form>
      <br />
    </div>
  );
}
