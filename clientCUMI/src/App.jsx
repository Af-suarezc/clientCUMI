import './App.css'


//npm packages
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

//pages

import Login from './pages/login/Login';
import Home from './pages/home/Home';
import DashHome from './pages/DashHome/DashHome';
import SessionP from './pages/Session/SessionP';
import FormClassRoom from './pages/FormClassRoom/FormClassRoom';
import FormProfessors from './pages/FormProfessors/FormProfessors';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/register" element= {<Login/>} />
        <Route path="/userlogged" element= {<DashHome/>} />
        <Route path="/login" element= {<SessionP/>} />
        <Route path="/registerClassRoom" element= {<FormClassRoom/>} />
        <Route path="/registerProfessors" element= {<FormProfessors/>} /> 
        {/* <Route path="/portfolio" element= {<Portfolio/>} />
        <Route path="/socials" element= {<Socials/>} /> */}
      </Routes>

    </>
  )
}

export default App
