import { useState } from "react";
import InputCidades from "../components/Endereco/InputCidades";
import InputEstados from "../components/Endereco/InputEstados";
import InputCep from "../components/Endereco/InputCep";
import InputLogradouro from "../components/Endereco/InputLogradouro";
import InputBairro from "../components/Endereco/InputBairro";

export default function() {
    const [estadoAtual, setEstadoAtual] = useState("")
    const [cep, setCep] = useState("")

    return <>
        <h2>Cadastro: Dados de Endereço</h2>
        <form id="dadosEndereco">
            <span>
                <InputCep setCep={setCep}/>
            </span>
            <span>
                <InputEstados cep={cep} estadoAtual={estadoAtual} setEstadoAtual={setEstadoAtual} />
            </span>
            <span>
                <InputCidades cep={cep} estadoAtual={estadoAtual}/>
            </span>
            <span>
                <InputBairro cep={cep}/>
            </span>
            <span>
                <InputLogradouro cep={cep}/>
            </span>
        </form>
    </>
}