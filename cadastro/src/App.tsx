import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Login from "./pages/Login"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type id = null | string

export default function() {

  const navigate = useNavigate()

  const [sesId, setSesId] = useState<id>(null)

  const handleLogout = async () => {
    setSesId(null)
    navigate("/login")
  }

  return (
    <div className="App">
      <header>
        <h1>Header do site</h1>
        <nav>
          <Link to="/">Home</Link>
          {!sesId && <Link to="/signup">Cadastrar</Link>}
          {!sesId && <Link to="/login">Login</Link>}
          {sesId && <a onClick={handleLogout}>Sair</a>}
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home sesid={sesId} />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/login" element={<Login setSesId={setSesId} />} />
      </Routes>
    </div>
  );
}