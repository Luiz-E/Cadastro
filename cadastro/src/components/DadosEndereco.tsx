import { useEffect, useState } from "react";
import InputCidades from "./Endereco/InputCidades";
import InputEstados from "./Endereco/InputEstados";
import InputCep from "./Endereco/InputCep";
import InputLogradouro from "./Endereco/InputLogradouro";
import InputBairro from "./Endereco/InputBairro";

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

type endereco = {
	uf:  string
	localidade:  string
	bairro: string
	logradouro: string
}

export default function({formData, setFormData}: props) {
    const [cep, setCep] = useState("")
	const [endereco, setEndereco] = useState({
		uf: "",
		localidade: "",
		bairro: "",
		logradouro: "",
	})
	
	async function setInfo() {
		const requestInfoViaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const infoViaCep: endereco = await requestInfoViaCep.json()
		const {logradouro, uf, localidade, bairro} = { ...infoViaCep }
		
		setEndereco({
			uf,
			localidade,
			bairro,
			logradouro,
		})
		
	}
	
	useEffect(() => {
		if (!cep) return
		setInfo()
	}, [cep])

	useEffect(() => {
		setFormData({
			...formData, 
			cep: cep,
			uf: endereco.uf,
			city: endereco.localidade,
			street: endereco.logradouro,
			district: endereco.bairro,
		 });
	}, [endereco])

    return <>
        <form className="form">
            <span>
                <InputCep setCep={setCep}/>
            </span>
            <span>
                <InputEstados cep={cep} endereco={endereco} setEstadoAtual={setEndereco}/>
            </span>
            <span>
                <InputCidades cep={cep} uf={endereco.uf} />
            </span>
            <span>
                <InputBairro bairro={endereco.bairro} />
            </span>
            <span>
                <InputLogradouro logradouro={endereco.logradouro}/>
            </span>
        </form>
    </>
}