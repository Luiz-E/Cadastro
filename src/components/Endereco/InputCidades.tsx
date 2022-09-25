import { useEffect, useState } from "react"

type props = {
    cep: string
    estadoAtual: string
}

export default function ({ cep, estadoAtual }: props) {
    const [cidades, setCidades] = useState([])
    const [listado, setListado] = useState(false)

    async function buscarCidades() {
        const requestCidades = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoAtual}/municipios`)
        const cidades = await requestCidades.json()
        setListado(true)
        setCidades(cidades)
        if (!cep) return
        selecionarCidade()
     }

     async function selecionarCidade() {
        const requestInfoViaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const infoLocal = await requestInfoViaCep.json()
        const [...option] = document.querySelectorAll("option")
        
        const cidadeAtual =  option.find((el) => el.value === infoLocal.localidade)
        if (cidadeAtual) cidadeAtual.selected = true
     }

    useEffect(() => {
        if (!estadoAtual) return
        buscarCidades()
    }, [cep, estadoAtual])    

    return <>
        <label htmlFor="cidade">Cidade:</label>
        <select id="cidade">
            {listado ? "" : <option >insira o cep ou selecione um estado</option>}
            {cidades.map(({nome}, idx) => <option key={idx} value={nome}>{nome}</option>)}
        </select>
    </>
}