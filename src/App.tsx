import './App.css'
import TabDadosDeEndereco from './pages/TabDadosDeEndereco'
import TabDadosDeCadastro from './pages/TabDadosDeCadastro'
import "./style/pageStyle.css"
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

export default function () {
  const dadosPessoais = <div className="content"> <TabDadosDeCadastro/></div>
  const dadosDeEndereco = <div className="content"> <TabDadosDeEndereco /></div>
  
function step1Validator() {
  return true
}

  function step2Validator(el: any) {
    console.log(el)
    return true
  }
   
  function onFormSubmit() {
  }
  return <div>
  <StepProgressBar 
  wrapperClass='dados'
  startingStep={0}
  onSubmit={onFormSubmit}
  previousBtnName="Anterior"
  nextBtnName="Próximo"
  steps={[
    {label: 'Informações Pessoais',
    name: 'infoPessoais',
    content: dadosPessoais,
    validator: step1Validator
    },
    {
      label: 'Endereço',
      name: 'endereco',
      content: dadosDeEndereco,
      validator: step2Validator
    }
  ]}/>
  </div>
}