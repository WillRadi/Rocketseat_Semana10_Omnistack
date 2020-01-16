import React from 'react';
import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';

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
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="githubUsername">Usuário do Github</label>
            <input name="githubUsername" id="githubUsername" required/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required/>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required/>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>        
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/27214629?s=460&v=4" alt="William Radi"/>
              <div className="user-info">
                <strong>William Radi</strong>
                <span>Javascript, Node, PHP</span>
              </div>
            </header>
            <p>
              bio bio bio bio bio bio bio bio bio
            </p>
            <a href="https://github.com/WillRadi">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/27214629?s=460&v=4" alt="William Radi"/>
              <div className="user-info">
                <strong>William Radi</strong>
                <span>Javascript, Node, PHP</span>
              </div>
            </header>
            <p>
              bio bio bio bio bio bio bio bio bio
            </p>
            <a href="https://github.com/WillRadi">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/27214629?s=460&v=4" alt="William Radi"/>
              <div className="user-info">
                <strong>William Radi</strong>
                <span>Javascript, Node, PHP</span>
              </div>
            </header>
            <p>
              bio bio bio bio bio bio bio bio bio
            </p>
            <a href="https://github.com/WillRadi">Acessar perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
