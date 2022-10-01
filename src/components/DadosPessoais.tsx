import InputMask from 'react-input-mask';

export default function() {

    return <form id="dadosPessoais">
		<span>
			<label htmlFor="nome">Nome Completo:</label>
			<input  id="nome"></input>
		</span>
		<span>
			<label htmlFor="data-nasc"> Data de Nascimento:</label>
			<input id="data-nasc" type={"date"}></input>
		</span>
		<span>
			<label htmlFor="Rg">RG:</label>
			<input id="Rg"></input>
		</span>
		<span>
			<label htmlFor="cpf">CPF:</label>
			<InputMask mask="999.999.999-99" id="cpf"/>
		</span>
		
	</form>
}