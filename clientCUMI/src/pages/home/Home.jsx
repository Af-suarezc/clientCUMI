import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div>
        <div className="navbar">
          <h1>PROYECTO CUMI-GESTORACADEMICO</h1>
          <br />
         <div className="linkbut">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
              <button>login</button>
          </Link>
         </div>
        </div>
        <div className="main-content">
          <h1>Binvenido al gestor academico</h1>
          <br />
          <br />
          <img src="https://www.svgrepo.com/show/492783/class.svg" alt="mainImage" />
        </div>
        
    </div>
  )
}
