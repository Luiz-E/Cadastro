import {useState} from "react";
import DadosContato from "../../components/DadosContato";
import DadosEndereco from "../../components/DadosEndereco";
import DadosPessoais from "../../components/DadosPessoais";
import { useNavigate } from "react-router-dom";

type id = null | string
type props = {
    setSesId: React.Dispatch<React.SetStateAction<id>>
}

export default function ({setSesId}: props) {
    const navigate = useNavigate()
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

    async function enviarInfo(data: {}) {
        const postInfo = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify(data)
        })

        const info = await postInfo.json()
        if (info.message === "success") {
            const reqInfoUser = await fetch(`/api/user/${info.id}`)
            const infoUser = await reqInfoUser.json()
            const req = await fetch("/api/makelogin", {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: infoUser.data.email, password: infoUser.data.password})
            }); 

            const login = await req.json()

            if (login.message === "success") {
                setSesId(login.sesid)
                navigate('/');
            }
        } 

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