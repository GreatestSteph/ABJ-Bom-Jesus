import Headerdeslogado from "./componentes/WebsiteDesign/HeaderDisconnected/headerdeslogado.jsx"
import Headerlogado from "./componentes/WebsiteDesign/HeaderConnected/headerlogado.jsx"
import Footer from "./componentes/WebsiteDesign/Footer/footer.jsx"
import Footer2 from "./componentes/WebsiteDesign/Footer/footer2.jsx"

import LoginSection from "./componentes/GerenciarUsuarios/LoginSection/loginsection.jsx"
import LoginSection2 from "./componentes/GerenciarUsuarios/LoginSection/loginsection2.jsx"
import EditProfiles from "./componentes/GerenciarUsuarios/EditProfile/editarperfis.jsx"
import UserList from "./componentes/GerenciarUsuarios/ListUsers/listarusuarios.jsx"


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* Gerenciar Usuários */}
          <Route path='/' element={
            <>
              <Headerdeslogado/>
              <LoginSection/>
              <Footer/>
              <Footer2/>
            </>
          }>
          </Route>
          <Route path='/login' element={
            <>
              <Headerdeslogado/>
              <LoginSection2/>
              <Footer/>
              <Footer2/>
            </>
          }>
          </Route>

          <Route path='/editaradicionarperfis' element={
            <>
              <Headerlogado/>
              <EditProfiles/>
              <Footer/>
              <Footer2/>
            </>
          }>
          </Route>

          <Route path='/listadeusuarios' element={
            <>
              <Headerlogado/>
              <UserList/>
              <Footer/>
              <Footer2/>
            </>
          }>
          </Route>

        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
