import Headerdeslogado from "./componentes/WebsiteDesign/HeaderDisconnected/headerdeslogado.jsx"
import Headerlogado from "./componentes/WebsiteDesign/HeaderConnected/headerlogado.jsx"
import Footer from "./componentes/WebsiteDesign/Footer/footer.jsx"

import LoginSection from "./componentes/GerenciarUsuarios/LoginSection/loginsection.jsx"
import EditProfile from "./componentes/GerenciarUsuarios/EditProfile/editarseuperfil.jsx"
import UserList from "./componentes/GerenciarUsuarios/ListUsers/listarusuarios.jsx"
import RegisterEditNewUser from "./componentes/GerenciarUsuarios/RegisterEditNewUser/registrareditarusuario.jsx"


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          /* Gerenciar Usuários */
          <Route path='/' element={
            <>
              <Headerdeslogado/>
              <LoginSection/>
              <Footer/>
            </>
          }>
          </Route>
          <Route path='/login' element={
            <>
              <Headerdeslogado/>
              <LoginSection/>
              <Footer/>
            </>
          }>
          </Route>

          <Route path='/logadoperfil' element={
            <>
              <Headerlogado/>
              <EditProfile/>
              <Footer/>
            </>
          }>
          </Route>

          <Route path='/listadeusuarios' element={
            <>
              <Headerlogado/>
              <UserList/>
              <Footer/>
            </>
          }>
          </Route>

          <Route path='/cadastrarusuario' element={
            <>
              <Headerlogado/>
              <RegisterEditNewUser/>
                <Footer/>
            </>
          }>
          </Route>

        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
