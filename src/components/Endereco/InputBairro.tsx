import { useState, useEffect } from "react"

type props = {
    cep: string
}

export default function ({cep}: props) {
    const [bairro, setBairro] = useState()

    async function buscarBairro() {
        const requestInfoViaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const infoViaCep = await requestInfoViaCep.json()
        setBairro(infoViaCep.bairro)
    }

    useEffect(() => {
        if(!cep) return
        buscarBairro()
    }, [cep]) 

    return <div className="container-bairro">
        <label htmlFor="bairro">Bairro:</label>
        <input id="bairro" type="text" value={bairro} />
    </div>

}