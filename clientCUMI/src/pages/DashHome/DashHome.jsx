import { Link } from "react-router-dom";
import "./dashhome.css";
import { useState, useEffect } from 'react';
import axios from "axios";

import {BarChart, XAxis , YAxis, Tooltip, CartesianGrid, Bar, Label, LabelList} from 'recharts'






export default function DashHome() {
  const [userName, setUserName]=useState(null);
  const [classroomQunatity, setClassroomQuantity] = useState([]);
  const [teachersroomQunatity, setTeachersroomQuantity] = useState([]);

  useEffect(()=>{
    let valorAlmacenado = localStorage.getItem('user');
    valorAlmacenado = JSON.parse(valorAlmacenado)
    setUserName(valorAlmacenado.username);
    const getClassroomData  = async () =>{
      try {
        //
        let selectedLevels = await axios.get('http://localhost:8080/api/info/classrooms');
          if (selectedLevels.status == 200 && selectedLevels.data.length != 0) {
            setClassroomQuantity([]);
            setClassroomQuantity(selectedLevels.data);
          }else{
            console.log("NO HAY DATOS PARA ESTE GRADO");
          }
      } catch (error) {
        console.log("error en el try para traer estado de cursos")
        console.log(error)
      }

    }
    getClassroomData();

  }, []);

  useEffect(()=>{
    const getTeachersroomData  = async () =>{
      try {

        let selectedTeachers = await axios.get('http://localhost:8080/api/info/teachersrooms');
          if (selectedTeachers.status == 200 && selectedTeachers.data.length != 0) {
            setTeachersroomQuantity([]);
            setTeachersroomQuantity(selectedTeachers.data);
            console.log(teachersroomQunatity);
          }else{
            console.log("NO HAY DATOS DE PROFESORES EN MATERIAS");
          }
      } catch (error) {
        console.log("error en el try para traer estado de cursos")
        console.log(error)
      }

    }
    getTeachersroomData();
  },[])
  return (
    <div>
      <div className="dashprofile">
        <div className="banner">
          <h1>Bienvenido al centro de gestión academico</h1>
        </div>
        <br></br>
        <div className="wrapper">
          <div className="left-banner">
            <h1>Hola</h1>
            <img
              src="https://www.svgrepo.com/show/492687/avatar-boy.svg"
              alt="genericavatar"
              className="fakeavatar"
            />
            <h3>{userName ? userName.toUpperCase() : "NA userName"}</h3>
            <br></br>
            <Link to="/registerClassRoom">
              <button>Agregar Salones</button>
            </Link>
            <Link to="/registerProfessors">
              <button>Agregar Profesores</button>
            </Link>
          </div>
          <div className="right-banner">
            <div className="classroomquanty">
              {classroomQunatity.length != 0 ? (
                <div>
                  <BarChart width={600} height={300} data={classroomQunatity}>
                    <XAxis dataKey="grado" stroke="#8884d8" >
                     <Label value="Cursos por Grado" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis />
                    <Tooltip
                      wrapperStyle={{
                        width: 65,
                        height: 50,
                        color: "black",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="cantidad" fill="#D6E3AD" barSize={120}>
                      <LabelList dataKey="grado" position="bottom" />
                    </Bar>
                  </BarChart>
                </div>
              ) : (
                <h2>No Hay Datos</h2>
              )}
            </div>
            <hr/>
            <div className="teachersquantity">
              {teachersroomQunatity.length != 0 ? (
                <div>
                  <BarChart
                    width={600}
                    height={300}
                    data={teachersroomQunatity}
                  >
                    <XAxis dataKey="grado" stroke="#8884d8">
                      <Label value="Profesores por Grado" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis />
                    <Tooltip
                      wrapperStyle={{
                        width: 100,
                        height: 50,
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar
                      dataKey="cantidad_profesores"
                      fill="#A2A1F3"
                      barSize={120}
                    >
                      <LabelList dataKey="grado" position="bottom" />
                    </Bar>
                  </BarChart>
                </div>
              ) : (
                <h2>No Hay Datos</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
