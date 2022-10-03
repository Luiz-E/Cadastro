import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import "./style.css"

type id = null | string


type props = {
    setSesId: React.Dispatch<React.SetStateAction<id>>
}

export default function({setSesId}: props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState("Login")

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (email && password) {
            const req = await fetch("/api/makelogin", {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password})
            }); 

            const login = await req.json()

            if (login.message === "success") {
                setSesId(login.sesid)
                navigate('/');
            } else {
                setStatus("Usuário não encontrado")
            }
        }
    }

    return <div className="container login">
            <div className="header">
                <h1>{status}</h1>
            </div>
            <div className="body">
                <span>
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleEmailInput}
                        placeholder="Digite seu e-mail"
                        />
                </span>
                <span>
                    <label htmlFor="password">Senha: </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordInput}
                        placeholder="Digite sua senha"
                    />
                </span>
            </div>
            <button onClick={handleLogin}>Logar</button>
        </div>
}