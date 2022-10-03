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
			<label htmlFor="number">Telefone:</label>
			<InputMask 
				onChange={(e) => {
					setFormData({ ...formData, tel: e.target.value });
				}}
				mask="(99) 99999-99" id="number"/>
		</span>
		<span>
			<label htmlFor="secondTel">Telefone secundário:</label>
			<InputMask 
				onChange={(e) => {
					setFormData({ ...formData, secondTel: e.target.value });
				}}
				mask="(99) 99999-99" id="secondTel"/>
		</span>
		<span>
			<label htmlFor="email">Email:</label>
			<input 
				onChange={(e) => {
					setFormData({ ...formData, email: e.target.value });
				}}
				id="email" type="email"></input>
		</span>
		
	</form>
}