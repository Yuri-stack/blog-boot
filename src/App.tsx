import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

import { AuthProvider } from "./contexts/AuthContext"
import { ToastContainer } from "react-toastify"

import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Perfil from "./pages/Perfil/Perfil"
import Cadastro from "./pages/Cadastro/Cadastro"
import ListaTemas from "./components/Temas/ListaTemas/ListaTemas"
import DeletarTema from "./components/Temas/DeletarTema/DeletarTema"
import FormularioTema from "./components/Temas/FormularioTema/FormularioTema"
import ListaPostagens from "./components/Postagens/ListaPostagens/ListaPostagens"
import DeletarPostagem from "./components/Postagens/DeletarPostagem/DeletarPostagem"
import FormularioPostagem from "./components/Postagens/FormulatioPostagem/FormularioPostagem"

// Importando o CSS do Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importanto o CSS
import './App.css'

// Importanto o CSS do Toastify
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />

      <BrowserRouter>
        <Navbar />

        <div style={{ minHeight: '100vh' }}>

          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />

            <Route path="/home" element={<Home />} />

            <Route path="/perfil" element={<Perfil />} />

            <Route path="/cadastro" element={<Cadastro />} />

            <Route path="/temas" element={<ListaTemas />} />

            <Route path="/postagens" element={<ListaPostagens />} />

            <Route path="/formularioTema" element={<FormularioTema />} />

            <Route path="/formularioTema/:id" element={<FormularioTema />} />

            <Route path="/deletarTema/:id" element={<DeletarTema />} />

            <Route path="/formularioPostagem" element={<FormularioPostagem />} />

            <Route path="/formularioPostagem/:id" element={<FormularioPostagem />} />

            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />

          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
