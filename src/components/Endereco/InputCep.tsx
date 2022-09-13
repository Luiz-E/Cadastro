import { Dispatch, SetStateAction } from "react"

type props = {
    setCep: Dispatch<SetStateAction<string>>
}

export default function ({setCep}: props) {

    function inputOnChange(cep: string) {
        if (cep.length === 8) {
            setCep(cep)
        }
    }

    return <>
        <input id="cep" size={8} type="text" maxLength={8} onChange={cep => inputOnChange(cep.target.value)} />
    </>
}