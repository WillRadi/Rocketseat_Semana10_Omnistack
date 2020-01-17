import React, { useEffect, useState } from 'react'
import api from './services/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
import './global.css'
import './Sidebar.css'
import './Main.css'
import './App.css'

/**
 * Conceitos mais importantes. Tudo é baseado neles:
 * 
 * Componente:
 *  Função que retorna alguma coisa (HTML, CSS, JS),
 *  Algo que se repete bastante, mas não interfere norestante da aplicação
 *  Inicia sem com letra maiúscula
 * 
 * Estado:
 *  Informação mantida pelo componente. React não fica monitorando variáveis p alterar o HTML. Para isso, usa-se o estado
 *  Ser "mantida pelo componente", significa que ele vai sempre ler e atualizar aquela informaçao.
 *  Importante lemrbar: Imutabilidade no React
 * 
 * Propriedade:
 *  São "atributos do HTML", mas de um componente  === <Header title="blabalab">
 *  Na função q Header, passar o prâmetro props e acessar o title com: {props.title}
 *  Informações que um componentem PAI passa para o componente filho
 */

function App() {
  // Toda vez q altera o estado, o componente é renderizado de novo
  const [devs, setDevs] = useState([])

  // passo o array vazio como parâmetro p determinar q só seja executado uma vez
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    // React usa Imutabilidade. Não pode-se apenas adicionar coisas. Deve-se criar de novo.
    // ou seja, não existe devs.push(..)
    // ** spread opeartor quebra o array de devs e passa eles como parâmetros/argumentos p setDevs
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        {/* passa a função p o componente filho atraves da PROPRIEDADE onSubmit */}
        {/* Assim, no componente filho, ao chamar a propriedade onSubmit, na verdade, será chamada da função handleAddDev */}
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            // PROPRIEDADE dev está passando o dev do map p o DevItem
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
