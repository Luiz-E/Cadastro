import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

    return <div>
        <h2>{userInfo?.name}</h2>
        <h2>{userInfo?.birthDate}</h2>
        <h2>{userInfo?.cpf}</h2>
        <h2>{userInfo?.password}</h2>
        <h2>{userInfo?.tel}</h2>
        <h2>{userInfo?.secondTel}</h2>
        <h2>{userInfo?.email}</h2>
        <h2>{userInfo?.cep}</h2>
        <h2>{userInfo?.uf}</h2>
        <h2>{userInfo?.city}</h2>
        <h2>{userInfo?.district}</h2>
        <h2>{userInfo?.street}</h2>
    </div>
}