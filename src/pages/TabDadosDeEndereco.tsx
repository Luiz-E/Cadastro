import { useState } from "react";
import InputCidades from "../components/Endereco/InputCidades";
import InputEstados from "../components/Endereco/InputEstados";
import InputCep from "../components/Endereco/InputCep";
import InputLogradouro from "../components/Endereco/InputLogradouro";
import InputBairro from "../components/Endereco/InputBairro";

export default function() {
    const [estadoAtual, setEstadoAtual] = useState("")
    const [cep, setCep] = useState("")

    return <div className="info">
        <h2>Cadastro: Dados de Endereço</h2>
        <div>
            <InputCep setCep={setCep}/>
            <InputEstados cep={cep} estadoAtual={estadoAtual} setEstadoAtual={setEstadoAtual} />
            <InputCidades cep={cep} estadoAtual={estadoAtual}/>
            <InputBairro cep={cep}/>
            <InputLogradouro cep={cep}/>
        </div>
    </div>
}