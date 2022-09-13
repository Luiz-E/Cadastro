import { useState } from "react";
import InputCidades from "../components/Endereco/InputCidades";
import InputEstados from "../components/Endereco/InputEstados";
import InputCep from "../components/Endereco/InputCep";
import InputLogradouro from "../components/Endereco/InputLogradouro";
import InputBairro from "../components/Endereco/InputBairro";
import "../style/tabDadosDeEndereco.css"

export default function() {
    const [estadoAtual, setEstadoAtual] = useState("")
    const [cep, setCep] = useState("")

    return <div className="tabDados">
        <h2>Cadastro: Dados de Endereço</h2>
        <div>
            <div>
                <span>
                    <label htmlFor="cep">CEP:</label>
                    <InputCep setCep={setCep}/>
                </span>
                <span>
                    <label htmlFor="cep">UF:</label>
                    <InputEstados cep={cep} estadoAtual={estadoAtual} setEstadoAtual={setEstadoAtual} />
                </span>
            </div>
            <div>
                <span>
                    <label htmlFor="cep">Cidade:</label>
                    <InputCidades cep={cep} estadoAtual={estadoAtual}/>
                </span>
                <span>
                    <label htmlFor="cep">Bairro:</label>
                    <InputBairro cep={cep}/>
                </span>
                <span>
                    <label htmlFor="cep">Rua:</label>
                    <InputLogradouro cep={cep}/>
                </span>
            </div>
        </div>
    </div>
}