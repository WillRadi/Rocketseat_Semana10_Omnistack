import React, { useEffect, useState } from 'react'
import api from './services/api'
import DevItem from './components/DevItem'
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

  const [github_username, setGithubUserName] = useState('')
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  // passo o array vazio como parâmetro p determinar q só seja executado uma vez
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        // Preenchendo o estado:
        setLatitude(latitude)
        setLongitude(longitude)
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000
      }
    )
  }, [])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(e) {
    e.preventDefault()

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    })

    // Limpar campos após submeter form:
    setGithubUserName('')
    setTechs('')

    // React usa Imutabilidade. Não pode-se apenas adicionar coisas. Deve-se criar de novo.
    // ou seja, não existe devs.push(..)
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={ handleAddDev }>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              name="github_username"
              id="github_username"
              value={ github_username }
              onChange={ e => setGithubUserName(e.target.value) }
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              value={ techs }
              onChange={ e => setTechs(e.target.value) }
              required
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                value={ latitude }
                required
                onChange={ e => setLatitude(e.target.value) }
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                value={ longitude }
                required
                // Meio de alterar valores do estado via input:
                onChange={ e => setLongitude(e.target.value) }
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>        
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
