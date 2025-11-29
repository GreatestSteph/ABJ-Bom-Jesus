import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContextoUsuario from "./services/context.js";

// Seus imports...
import Headerdeslogado from "./componentes/WebsiteDesign/HeaderDisconnected/headerdeslogado.jsx";
import Headerlogado from "./componentes/WebsiteDesign/HeaderConnected/headerlogado.jsx";
import Footer from "./componentes/WebsiteDesign/Footer/footer.jsx";
import Footer2 from "./componentes/WebsiteDesign/Footer/footer2.jsx";

import LoginSection from "./componentes/GerenciarUsuarios/LoginSection/loginsection.jsx";
import LoginSection2 from "./componentes/GerenciarUsuarios/LoginSection/loginsection2.jsx";

import EditProfiles from "./componentes/GerenciarUsuarios/EditProfile/editarperfis.jsx";
import UserList from "./componentes/GerenciarUsuarios/ListUsers/listarusuarios.jsx";

import ListHospedes from "./componentes/GerenciarHospedes/ListHospedes/ListarHospedes.jsx";
import EditarHospede from "./componentes/GerenciarHospedes/EditarHospede/EditarHospede.jsx";
import DetalhesHospede from "./componentes/GerenciarHospedes/DetalhesHospede/DetalhesHospede.jsx";

import Hospedados from "./componentes/GerenciarHospedes/HospedarHospede/listadeentradas.jsx"
import DetalhesHospedagem from "./componentes/GerenciarHospedes/DetalhesHospedagem/DetalhesHospedagem.jsx";


import EditProducts from "./componentes/GerenciarProdutos/EditProducts/editarprodutos.jsx";
import ProdutosLista from "./componentes/GerenciarProdutos/ListProducts/listarprodutos.jsx";

import ListQuartos from "./componentes/GerenciarQuartos/ListQuartos/ListQuartos.jsx";
import EditarQuarto from "./componentes/GerenciarQuartos/EditarQuarto/EditarQuarto.jsx";

import HistoricoDeConsumos from "./componentes/RegistrarConsumo/listarhistoricodeconsumo.jsx"
import RegistrarHistoricoConsumo from "./componentes/RegistrarConsumo/registrarconsumo.jsx"


import ListarOcorrencias from "./componentes/GerenciarOcorrencias/ListOcorrencias/ListarOcorrencias.jsx";
import ListaOcorrencias from "./componentes/GerenciarOcorrencias/ListaOcorrencias/ListaOcorrencias.jsx";
import DetalhesOcorrencia from "./componentes/GerenciarOcorrencias/DetalhesOcorrencia/DetalhesOcorrencia.jsx";
import CadastrarOcorrencia from "./componentes/GerenciarOcorrencias/CadastrarOcorrencia/CadastrarOcorrencia.jsx";
import EditarOcorrencia from "./componentes/GerenciarOcorrencias/EditarOcorrencia/EditarOcorrencia.jsx";
import EditarTipoOcorrencia from "./componentes/GerenciarTiposOcorrencias/EditarOcorrencia/EditarOcorrencia.jsx";

import ListaBloqueios from "./componentes/GerenciarBloqueios/ListaBloqueios/ListaBloqueios.jsx";
import DetalhesBloqueio from "./componentes/GerenciarBloqueios/DetalhesBloqueio/DetalhesBloqueio.jsx";

import PainelRelatorios from "./componentes/Relatorios/PainelRelatorios/PainelRelatorios.jsx";
import RelatorioHospedagens from "./componentes/Relatorios/RelatorioHospedagens/RelatorioHospedagens.jsx";
import RelatorioConsumos from "./componentes/Relatorios/RelatorioConsumos/RelatorioConsumos.jsx";
import RelatorioHospedesBloqueados from "./componentes/Relatorios/RelatorioHospedesBloqueados/RelatorioHospedesBloqueados.jsx";
import RelatorioSocioeconomico from "./componentes/Relatorios/RelatorioSocioeconomico/RelatorioSocioeconomico.jsx";
import RelatorioOcorrencias from "./componentes/Relatorios/RelatorioOcorrencias/RelatorioOcorrencias.jsx";

function App() {
  const [usuario, setUsuario] = useState({
    nome: '',
    logado: false,
  });

  const podeVerUsuarios = () => {
    const cargosPermitidos = ["TI", "ADMIN", "Administrador"];
    return cargosPermitidos.includes(usuario.cargo);
  };



  return (
    <ContextoUsuario.Provider value={[usuario, setUsuario]}>
      <BrowserRouter>
        <Routes>
          {/* Redirecionar para login se não estiver logado */}
          {!usuario.logado ? (
            <>
              <Route
                path="/"
                element={
                  <>
                    <Headerdeslogado />
                    <LoginSection />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Headerdeslogado />
                    <LoginSection2 />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {podeVerUsuarios() && (
                <>
                  <Route
                    path="/registrousuarios"
                    element={
                      <>
                        <Headerlogado />
                        <EditProfiles />
                        <Footer />
                        <Footer2 />
                      </>
                    }
                  />
                  <Route
                    path="/registrousuarios/:id"
                    element={
                      <>
                        <Headerlogado />
                        <EditProfiles />
                        <Footer />
                        <Footer2 />
                      </>
                    }
                  />
                  <Route
                    path="/listadeusuarios"
                    element={
                      <>
                        <Headerlogado />
                        <UserList />
                        <Footer />
                        <Footer2 />
                      </>
                    }
                  />
                </>
              )}

              <Route path="*" element={<Navigate to="/hospedes" />} />

              {/* Gerenciar Produtos */}
              <Route
                path="/registroprodutos"
                element={
                  <>
                    <Headerlogado />
                    <EditProducts />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/registroprodutos/:id"
                element={
                  <>
                    <Headerlogado />
                    <EditProducts />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/listarprodutos"
                element={
                  <>
                    <Headerlogado />
                    <ProdutosLista />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
      


              {/* Gerenciar Consumos */}
              <Route
                path="/registroconsumos"
                element={
                  <>
                    <Headerlogado />
                    <RegistrarHistoricoConsumo/>
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/registroconsumos/:id"
                element={
                  <>
                    <Headerlogado />
                    <RegistrarHistoricoConsumo/>
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/listarconsumos"
                element={
                  <>
                    <Headerlogado />
                    <HistoricoDeConsumos/>
                    <Footer />
                    <Footer2 />
                  </>
                }
              />


              {/* Gerenciar Hóspedes */}
              <Route
                path="/hospedes"
                element={
                  <>
                    <Headerlogado />
                    <ListHospedes />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/hospedes/cadastrar"
                element={
                  <>
                    <Headerlogado />
                    <EditarHospede />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/hospedes/detalhes/:id"
                element={
                  <>
                    <Headerlogado />
                    <DetalhesHospede />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/hospedes/:id"
                element={
                  <>
                    <Headerlogado />
                    <EditarHospede />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />


              {/* registrar entradas de hospedes */}
              <Route
                path="/historicodehospedagens"
                element={
                  <>
                    <Headerlogado />
                    <Hospedados/>
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/historicodehospedagens/detalhes/:id"
                element={
                  <>
                    <Headerlogado />
                    <DetalhesHospedagem/>
                    <Footer />
                    <Footer2 />
                  </>
                }
              />




              {/* Gerenciar Quartos */}
              <Route
                path="/gerenciarquartos"
                element={
                  <>
                    <Headerlogado />
                    <ListQuartos />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/gerenciarquartos/novo"
                element={
                  <>
                    <Headerlogado />
                    <EditarQuarto />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/gerenciarquartos/:id"
                element={
                  <>
                    <Headerlogado />
                    <EditarQuarto />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />

              {/* Gerenciar Ocorrências */}
              <Route
                path="/ocorrencias"
                element={
                  <>
                    <Headerlogado />
                    <ListaOcorrencias />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/tipos-ocorrencias"
                element={
                  <>
                    <Headerlogado />
                    <ListarOcorrencias />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/tipo-ocorrencias/cadastrar"
                element={
                  <>
                    <Headerlogado />
                    <EditarTipoOcorrencia />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/tipo-ocorrencias/:id"
                element={
                  <>
                    <Headerlogado />
                    <EditarTipoOcorrencia />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/ocorrencias/:id"
                element={
                  <>
                    <Headerlogado />
                    <EditarOcorrencia />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/ocorrencias/lista"
                element={
                  <>
                    <Headerlogado />
                    <ListaOcorrencias />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/ocorrencias/detalhes/:id"
                element={
                  <>
                    <Headerlogado />
                    <DetalhesOcorrencia />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/ocorrencias/cadastrar-nova"
                element={
                  <>
                    <Headerlogado />
                    <CadastrarOcorrencia />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/ocorrencias/editar/:id"
                element={
                  <>
                    <Headerlogado />
                    <EditarOcorrencia />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />

              {/* Gerenciar Bloqueios */}
              <Route
                path="/bloqueios"
                element={
                  <>
                    <Headerlogado />
                    <ListaBloqueios />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/bloqueios/detalhes/:id"
                element={
                  <>
                    <Headerlogado />
                    <DetalhesBloqueio />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />

              {/* Relatórios e Estatísticas */}
              <Route
                path="/relatorios"
                element={
                  <>
                    <Headerlogado />
                    <PainelRelatorios />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/relatorios/hospedagens"
                element={
                  <>
                    <Headerlogado />
                    <RelatorioHospedagens />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/relatorios/consumos"
                element={
                  <>
                    <Headerlogado />
                    <RelatorioConsumos />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/relatorios/hospedes-bloqueados"
                element={
                  <>
                    <Headerlogado />
                    <RelatorioHospedesBloqueados />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/relatorios/socioeconomico"
                element={
                  <>
                    <Headerlogado />
                    <RelatorioSocioeconomico />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />
              <Route
                path="/relatorios/ocorrencias"
                element={
                  <>
                    <Headerlogado />
                    <RelatorioOcorrencias />
                    <Footer />
                    <Footer2 />
                  </>
                }
              />

              {/* Redirecionamento padrão para rota inicial logada */}
              <Route path="*" element={<Navigate to="/registrousuarios" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ContextoUsuario.Provider>
  );
}

export default App;
