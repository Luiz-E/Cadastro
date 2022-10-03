import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type props = {
    sesid: string | null
}

export default function({sesid}: props){

    const [userInfo, setUserInfo] = useState({name: ""}) 

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

    return <div><h2>{userInfo?.name}</h2></div>
}