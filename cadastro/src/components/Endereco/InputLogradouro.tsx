type props = {
    logradouro: string
}

export default function({logradouro}: props) {

    return <>
        <label htmlFor="rua">Rua:</label>
        <input
			id="rua"
			type="text"
			value={logradouro} />
    </>

}