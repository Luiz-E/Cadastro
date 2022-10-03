import {useState} from "react";
import DadosContato from "../../components/DadosContato";
import DadosEndereco from "../../components/DadosEndereco";
import DadosPessoais from "../../components/DadosPessoais";

export default function () {

    const [page, setPage] = useState(0)
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        cpf:"",
        password:"",
        tel:"",
        secondTel:"",
        email:"",
        cep:"",
        uf:"",
        city:"",
        district: "",
        street:""
    })

    const formTitles = ["Dados Pessoais","Dados de Contato","Dados de Endereço"]

    function enviarInfo(data: {}) {
        fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify(data)
        })
    }

    function actualPage() {
        if (page === 0) {
            return <DadosPessoais formData={formData} setFormData={setFormData}/>
        } 
        if (page === 1) {
            return <DadosContato formData={formData} setFormData={setFormData}/>
        }
        return <DadosEndereco formData={formData} setFormData={setFormData}/>
    }

    return <div className="container">
        <div className="progress-bar">
            <div
                style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
            ></div>
        </div>
        <div className="forms">
            <div className="header">
                <h1>{formTitles[page]}</h1>
            </div>
            <div className="body">
                <div>{actualPage()}</div>
            </div>
        </div>
        <div className="footer">

            <button 
                className="prev"
                disabled={page == 0}
                onClick={() => {
                    setPage((currPage) => currPage-1)}}
            >
                voltar
            </button>
            <button 
                className="next"
                onClick={() => {
                    if (page==formTitles.length - 1) {

                        enviarInfo(formData) 
                        
                    } else {
                        setPage((currPage) => currPage+1)}}
                    }
            >
                {page === formTitles.length-1? "Enviar": "Próximo"}
            </button>
        </div>
    </div>
}