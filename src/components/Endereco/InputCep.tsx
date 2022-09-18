import { Dispatch, SetStateAction } from "react"

type props = {
    setCep: Dispatch<SetStateAction<string>>
}

export default function ({setCep}: props) {

    function inputOnChange(cep: HTMLInputElement) {
        if (cep.value.length === 5) {
            cep.value = cep.value + "-"
        }
        if (cep.value.length === 9) {
            setCep(cep.value.replace("-",""))
        }
    }

    return <div className="container-cep">
        <label htmlFor="cep">CEP:</label>
        <input id="cep" size={8} type="text" maxLength={9} onChange={cep => inputOnChange(cep.target)} />
    </div>
}