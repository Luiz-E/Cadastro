import { useEffect, useState } from "react"

type props = {
    cep: string
}

export default function({cep}: props) {
    const [logradouro, setLogradouro] = useState()

    async function buscarLogradouro() {
        const requestInfoViaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const infoViaCep = await requestInfoViaCep.json()
        setLogradouro(infoViaCep.logradouro)
    }

    useEffect(() => {
        if(!cep) return
        buscarLogradouro()
    }, [cep])

    return <>
        <input type="text" value={logradouro} />
    </>

}