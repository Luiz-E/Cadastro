import InputNomeCompleto from "../components/DadosPessoais/InputNomeCompleto"
import InputDataNasc from "../components/DadosPessoais/InputDataNasc"
import InputRG from "../components/DadosPessoais/InputRG"
import InputCpf from "../components/DadosPessoais/InputCpf"

export default function() {

    return <div className="info">
        <h2>Cadastro: Dados Pessoais</h2>
        <div>
            <InputNomeCompleto/>
            <InputDataNasc/>
            <InputRG/>
            <InputCpf/>
        </div>
    </div>
}