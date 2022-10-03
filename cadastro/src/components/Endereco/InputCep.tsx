import { Dispatch, SetStateAction } from "react"
import InputMask from 'react-input-mask';

type props = {
    setCep: Dispatch<SetStateAction<string>>
}

export default function ({setCep}: props) {

    function inputOnChange(cep: HTMLInputElement) {
        if (cep.value.indexOf("_") == -1) {
            setCep(cep.value.replace("-",""))
        }
    }

    return <>
        <label htmlFor="cep">CEP:</label>
        <InputMask mask="99999-999" id="cep" size={8} type="text" onChange={(cep: { target: HTMLInputElement; }) => inputOnChange(cep.target)} />
    </>
}