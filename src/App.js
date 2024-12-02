import { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TelaLogin from './componentes/pages/login/index.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import TelaMenu from './componentes/pages/menu/TelaMenu.jsx';
import Feed from './componentes/pages/feed/Feed.jsx';

export const ContextoUsuario = createContext();

function App() {
  const [usuario, setUsuario] = useState({
    usuario: "",
    logado: false
  });
  if (!usuario.logado) {
    return (
      <Provider store={store}>
        <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
          <TelaLogin />
        </ContextoUsuario.Provider>
      </Provider>
    );
  }
  else {
    return (
      <Provider store={store}>
        <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
          <BrowserRouter>
            <Routes>
              <Route path="/feed" element={<Feed />} />
              <Route path="/" element={<TelaMenu />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </Provider>
    );
  }
}
export default App;
