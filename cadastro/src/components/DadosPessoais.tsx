import InputMask from 'react-input-mask';

type props = {
	formData: {
		name: string;
		birthDate: string;
		cpf: string;
		password: string;
		tel: string;
		secondTel: string;
		email: string;
		cep: string;
		uf: string;
		city: string;
		district: string;
		street: string;
	}
	setFormData: React.Dispatch<React.SetStateAction<{
		name: string;
		birthDate: string;
		cpf: string;
		password: string;
		tel: string;
		secondTel: string;
		email: string;
		cep: string;
		uf: string;
		city: string;
		district: string;
		street: string;
	}>>
}

export default function({formData, setFormData}: props) {
	
    return <form className="form">
		<span>
			<label htmlFor="name">Nome Completo:</label>
			<input 
			onChange={(e) => {
          		setFormData({ ...formData, name: e.target.value });
        	}} 
			id="name"></input>
		</span>
		<span>
			<label htmlFor="birthDate"> Data de Nascimento:</label>
			<input
			onChange={(e) => {
				setFormData({ ...formData, birthDate: e.target.value });
		  	}}
			id="birthDate" 
			type={"date"}></input>
		</span>
		<span>
			<label htmlFor="cpf">CPF:</label>
			<InputMask
			onChange={(e) => {
				setFormData({ ...formData, cpf: e.target.value });
		  	}}
			mask="999.999.999-99"
			id="cpf"/>
		</span>
		<span>
			<label htmlFor="password">Senha:</label>
			<input 
			onChange={(e) => {
				setFormData({ ...formData, password: e.target.value });
		  	}}
			id="password"></input>
		</span>
		
	</form>
}