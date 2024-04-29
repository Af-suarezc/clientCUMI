import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./sessionp.css"


export default function SessionP() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/userlogged")
    } catch (err) {
      setErr(err.response.data);
      setTimeout(() => {
        setErr(null);
      }, 2500);
    }
  };
  console.log(err);
  return (
    <div className="login">
      <div className="minibanner">
        <Link to="/">
          <h3>PROYECTO CUMI-GESTORACADEMICO - Inicio de Sesión</h3>
        </Link>
        <img
          src="https://www.svgrepo.com/show/343410/cool-emoticon-emotion-expression-face-smiley-sunglasses.svg"
          alt="imagenCool"
        />
      </div>
      <div className="maincard">
        <div className="left-card">
          <span>¿No tienes una cuenta?</span>
          <Link to="/register">
            <button>Registrate</button>
          </Link>
        </div>
        <div className="right-card">
          <h1>Inicia Aquí Sesión</h1>
          <form>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <h1 className="errormessage">{err}</h1>}
            <button onClick={handleLogin}>Iniciar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
