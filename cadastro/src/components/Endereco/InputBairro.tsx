
type props = {
	bairro: string
}

export default function ({bairro}: props) {
    
	
    return <>
        <label htmlFor="bairro">Bairro:</label>
        <input 
            id="bairro" 
            type="text" 
            value={bairro} />
    </>

}