import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

type id = null | string


type props = {
    setSesId: React.Dispatch<React.SetStateAction<id>>
}

export default function({setSesId}: props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState("Insira as informações de login")

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

    return (
        <div>
            <h2>{status}</h2>

            <input
                type="text"
                value={email}
                onChange={handleEmailInput}
                placeholder="Digite seu e-mail"
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordInput}
                placeholder="Digite sua senha"
            />
            <button onClick={handleLogin}>Logar</button>
        </div>
    );
}