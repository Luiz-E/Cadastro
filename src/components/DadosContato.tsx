import InputMask from 'react-input-mask';

export default function() {

    return <form id="dadosPessoais">
		<span>
			<label htmlFor="telefone">Telefone:</label>
			<InputMask mask="(99) 99999-99" id="telefone"/>
		</span>
		<span>
			<label htmlFor="telefoneReserva">Telefone secundário:</label>
			<InputMask mask="(99) 99999-99" id="telefoneReserva"/>
		</span>
		<span>
			<label htmlFor="email">Email:</label>
			<input id="email" type="email"></input>
		</span>
		
	</form>
}