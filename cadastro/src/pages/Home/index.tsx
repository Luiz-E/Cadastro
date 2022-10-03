import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./style.css"

type props = {
    sesid: string | null
}

type user = {
    name: string
    birthDate: string
    cpf: string
    password: string
    tel: string
    secondTel: string
    email: string
    cep: string
    uf: string
    city: string
    district: string
    street: string
}

export default function({sesid}: props){

    const [userInfo, setUserInfo] = useState<user>() 

    const navigate = useNavigate()

    async function setUser() {
        const req = await fetch(`/api/logged/${sesid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const info = await req.json()
        setUserInfo(info)
        
    }

    useEffect(() => {

        if (!sesid) {
            navigate("/login")
        }

        setUser()
    }, [])

    return <div className="container home">
        <div className="infoPessoais">
            <h2>Informações Pessoais</h2>
            <span>
                <h3>Nome: </h3>
                <p>{userInfo?.name}</p>
            </span>
            <span>
                <h3>Data de Nascimento: </h3>
                <p>{userInfo?.birthDate}</p>
            </span>
            <span>
                <h3>CPF: </h3>
                <p>{userInfo?.cpf}</p>
            </span>
        </div>
        <div className="contato">
            <h2>Contato</h2>
            <span>
                <h3>Telefone: </h3>
                <p>{userInfo?.tel}</p>
            </span>
            <span>
                <h3>Telefone Secundário: </h3>
                <p>{userInfo?.secondTel}</p>
            </span>
            <span>
                <h3>E-mail: </h3>
                <p>{userInfo?.email}</p>
            </span>
        </div>
        <div className="endereco">
            <h2>Endereço</h2>
            <span>
                <h3>CEP: </h3>
                <p>{userInfo?.cep}</p>
            </span>
            <span>
                <h3>UF: </h3>
                <p>{userInfo?.uf}</p>
            </span>
            <span>
                <h3>Cidade: </h3>
                <p>{userInfo?.city}</p>
            </span>
            <span>
                <h3>Bairro: </h3>
                <p>{userInfo?.district}</p>
            </span>
            <span>
                <h3>Rua: </h3>
                <p>{userInfo?.street}</p>
            </span>
        </div>
    </div>
}