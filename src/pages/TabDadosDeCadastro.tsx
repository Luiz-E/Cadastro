import { useState } from "react";
import InputNomeCompleto from "../components/DadosPessoais/InputNomeCompleto"


export default function() {

    return <div className="tabDados">
        <h2>Cadastro: Dados Pessoais</h2>
        <InputNomeCompleto/>        
    </div>
}