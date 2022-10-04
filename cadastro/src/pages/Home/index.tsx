import InputMask from 'react-input-mask';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./style.css"


type id = null | string
type props = {
    sesid: string | null
    setSesId: React.Dispatch<React.SetStateAction<id>>
}

type user = {
    id?: number
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



export default function({sesid, setSesId}: props){

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

    async function atualizar() {
        console.log(userInfo)
        fetch(`/api/user/${userInfo?.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
    }

    async function deleteUser() {
        const reqDelete = await fetch(`http://localhost:8080/api/user/${userInfo?.id}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const deleted = await reqDelete.json()
        if(deleted.message === "deleted") {
            setSesId(null)
            navigate("/login")
        }
    }

    return <div className="container home">
        <div>
            <h2>Informações Pessoais</h2>
            <span>
                <h3>Nome: </h3>
                <input name='name' value={userInfo?.name} onChange={e => {if (userInfo) setUserInfo({...userInfo, name: e.target.value})}}/>
            </span>
            <span>
                <h3>Data de Nascimento: </h3>
                <input value={userInfo?.birthDate} onChange={e => {if (userInfo) setUserInfo({...userInfo, birthDate: e.target.value})}}/>
            </span>
            <span>
                <h3>CPF: </h3>
                <InputMask mask="999.999.999-99" value={userInfo?.cpf} onChange={e => {if (userInfo) setUserInfo({...userInfo, cpf: e.target.value})}}/>
            </span>
            <span>
                <h3>Senha: </h3>
                <input value={userInfo?.password} onChange={e => {if (userInfo) setUserInfo({...userInfo, password: e.target.value})}}/>
            </span>
        </div>
        <div>
            <h2>Contato</h2>
            <span>
                <h3>Telefone: </h3>
                <InputMask mask="(99) 99999-9999" value={userInfo?.tel} onChange={e => {if (userInfo) setUserInfo({...userInfo, tel: e.target.value})}}/>
            </span>
            <span>
                <h3>Telefone Secundário: </h3>
                <InputMask mask="(99) 99999-9999" value={userInfo?.secondTel} onChange={e => {if (userInfo) setUserInfo({...userInfo, secondTel: e.target.value})}}/>
            </span>
            <span>
                <h3>E-mail: </h3>
                <input value={userInfo?.email} onChange={e => {if (userInfo) setUserInfo({...userInfo, email: e.target.value})}}/>
            </span>
        </div>
        <div>
            <h2>Endereço</h2>
            <span>
                <h3>CEP: </h3>
                <InputMask mask="99999-999" value={userInfo?.cep} onChange={e => {if (userInfo) setUserInfo({...userInfo, cep: e.target.value})}}/>
            </span>
            <span>
                <h3>UF: </h3>
                <input value={userInfo?.uf} onChange={e => {if (userInfo) setUserInfo({...userInfo, uf: e.target.value})}}/>
            </span>
            <span>
                <h3>Cidade: </h3>
                <input value={userInfo?.city} onChange={e => {if (userInfo) setUserInfo({...userInfo, city: e.target.value})}}/>
            </span>
            <span>
                <h3>Bairro: </h3>
                <input value={userInfo?.district} onChange={e => {if (userInfo) setUserInfo({...userInfo, district: e.target.value})}}/>
            </span>
            <span>
                <h3>Rua: </h3>
                <input value={userInfo?.street} onChange={e => {if (userInfo) setUserInfo({...userInfo, street: e.target.value})}}/>
            </span>
        </div>
        <div className="buttons">
            <button onClick={deleteUser} className="delete">Excluir Conta</button>
            <button onClick={atualizar} className="update">Atualizar Conta</button>
        </div>
    </div>
}