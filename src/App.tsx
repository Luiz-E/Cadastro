import './App.css'
import TabDadosDeEndereco from './pages/TabDadosDeEndereco'
import TabDadosDeCadastro from './pages/TabDadosDeCadastro'
import TabDadosContato from './pages/TabDadosContato'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

export default function () {
  const dadosPessoais = <div><TabDadosDeCadastro/></div>
  const dadosDeEndereco = <div><TabDadosDeEndereco /></div>
  const dadosContato = <div><TabDadosContato /></div>

  async function testeDeRequisicao() {
    const req = await fetch("/api")
    const res = await req.json()
    console.log(res)
  }
  
  function onFormSubmit() {
    testeDeRequisicao() 
  }
  return <div>
  <StepProgressBar 
    wrapperClass='wrapper'
    contentClass="content"
    buttonWrapperClass="buttonContainer"
    startingStep={0}
    onSubmit={onFormSubmit}
    previousBtnName="Anterior"
    nextBtnName="Próximo"
    primaryBtnClass='next'
    submitBtnName="Enviar"
    steps={[
      {label: 'Informações Pessoais',
      name: 'infoPessoais',
      content: dadosPessoais,
      },
      {label: 'Contato',
      name: 'contato',
      content: dadosContato,},
      {
        label: 'Endereço',
        name: 'endereco',
        content: dadosDeEndereco,
      }
    ]}/>
  </div>
}