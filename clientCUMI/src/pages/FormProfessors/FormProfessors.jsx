import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./formprofessors.css"


export default function FormProfessors() {
  const [inputs, setInputs]=useState({
    "name":"",
    "lastname":"",
    "email":"",
    "age":"",
    "profession":"",
    "classroom":""
  });

  //opciones disponibles:
  const optionsList =["Kinder", "Jardin", "Primero", "Segundo", "Tercero", "Cuarto", "Quinto"];
  //Opciones condicionales:
  const [roomLists, setRoomLists]=useState([]);

  const [error, setError]=useState(null);
  const [error1, setError1]=useState(null);
  const [successMsg, setSuccessMsg]=useState(null);
  const [succGrado, setSuccessGrado]=useState(false);
  const handleChange= e =>{
     setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }
  console.log(inputs);
  const handleClick = async e =>{
    e.preventDefault();
    const selectedOption=roomLists.find(option=>option.classname == inputs.classroom);
    console.log(selectedOption); 
    const classRoomId = selectedOption.id;

    console.log(classRoomId);
    inputs["classroomid"] = classRoomId
    console.log(inputs); 
    // Validar que todas las llaves tengan valor
    const allValuesPresent = Object.values(inputs).every(value => value != "");
    if (!allValuesPresent) {
        setError("Todos los campos son obligatorios");
        return;
    }
    try {
        console.log("estoy aquí en el try")
        let registerClass = await axios.post('http://localhost:8080/api/teachers/teachersRegister', inputs);
        if (registerClass.status == 200) {
          console.log("Exito en el registro clase");
          console.log(registerClass);
          setSuccessMsg(registerClass.data);
          setInputs({
            name: "",
            lastname: "",
            email: "",
            age:"",
            profession:"",
            classroom:""
          });
        }

    } catch (error) {
        setError(error.response.data);
    }

  }
  //NUEVA FUNCIONALIDAD SELECCIONAR CLASES DISPONIBLES PARA ESE SALON
  const handleOptionSelect = async (e) => {
    const selectedOption = e.target.value;
    console.log("Opción seleccionada:", selectedOption);
    try {
        let selectedLevel = await axios.get(`http://localhost:8080/api/room/class/${selectedOption}`);
        if (selectedLevel.status == 200 && selectedLevel.data.length !=0) {
          console.log("Exito en el consulta clases");
          console.log(selectedLevel);
          setRoomLists(selectedLevel.data);
          setSuccessGrado(true)
        }else{
          console.log("NO HAY DATOS PARA ESTE GRADO");
          setError1("No hay datos para este grado, ingresa desde la pagina principal a la opción añadir salon");
          setSuccessGrado(false);
        }
    } catch (error) {
      console.error('Error al obtener los valores asociados:', error);
    }
  };

return (
  <div>
    <h1>Registra Informacion Profesores</h1>
    <br></br>
    <form className="formabove">
      <label htmlFor="grado">Selecciona Primero el Grado:</label>
      <input
        type="text"
        placeholder="Grado"
        name="grado"
        onChange={handleChange}
        list="options"
        value={inputs.grado}
        onBlur={handleOptionSelect}
      />
      <datalist id="options">
        {optionsList.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
      {error1 && <p>{error1}</p>}
      {successMsg && <h4>{successMsg}!!</h4>}
    </form>
    <br />
    <div className="conditionalcontainer">
      {succGrado && roomLists.length != 0 && (
        <div className="rendercontainer">
          <h1>INGRESA TODOS LOS DATOS DEL PROFESOR</h1>
          <br/>
          <br/>
          <form>
            <label htmlFor="name">Nombre del Docente:</label>
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              onChange={handleChange}
              value={inputs.name}
            />
            <label htmlFor="lastname">Apellido del Docente:</label>
            <input
              type="text"
              placeholder="Apellidos"
              name="lastname"
              onChange={handleChange}
              value={inputs.lastname}
            />
            <label htmlFor="email">Correo del Docente:</label>
            <input
              type="text"
              placeholder="Correo"
              name="email"
              onChange={handleChange}
              value={inputs.email}
            />
            <label htmlFor="email">Edad del Docente:</label>
            <input
              type="text"
              placeholder="Edad"
              name="age"
              onChange={handleChange}
              value={inputs.age}
            />
            <label htmlFor="profession">Profesion:</label>
            <input
              type="text"
              placeholder="Profesión"
              name="profession"
              onChange={handleChange}
              value={inputs.profession}
            />
            <label htmlFor="classroom">Materia del Grado:</label>
            <input
              type="text"
              placeholder="materia"
              name="classroom"
              onChange={handleChange}
              list="roomLists"
              value={inputs.classroom}
            //   onBlur={handleOptionSelect}
            />
            <datalist id="roomLists">
              {roomLists.map((option) => (
                <option key={option.id} value={option.classname} />
              ))}
            </datalist>
            <button onClick={handleClick}>Agregar</button>
            {error && <p>{error}</p>}
            {successMsg && <h4>{successMsg}!!</h4>}
          </form>
        </div>
      )}
    </div>
    <br />
    <Link to="/userlogged">
      <button className="gobackbutton">BackHome</button>
    </Link>
  </div>
);
}
