import { ChangeEvent, useEffect, useState } from "react"
import { Button, Container, Col, Form, Row } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"
import { toastAlerta } from "../../utils/toastAlerta"

import './Cadastro.css'

function Cadastro() {

  let navigate = useNavigate()

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      retornar()
    }
  }, [usuarioResposta])

  function retornar() {
    navigate("/login")
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta)
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso')

      } catch (error) {
        toastAlerta('Erro ao cadastrar o Usuário', 'erro')
      }

    } else {
      toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'erro')
      setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
      setConfirmaSenha("")                  // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col className="bg-cadastro" />

        <Col className="d-flex flex-column justify-content-center align-items-center">

          <h1 className="text-center">Cadastrar</h1>

          <Form onSubmit={cadastrarNovoUsuario} className="w-75">

            <Form.Group className="mb-3">
              <Form.Label className="fs-6">Nome</Form.Label>
              <Form.Control
                type="text" placeholder="Insira o seu nome" name="nome" required
                value={usuario.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-6">Usuário</Form.Label>
              <Form.Control
                type="email" placeholder="Insira o seu email" name="usuario" required
                value={usuario.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-6">Foto</Form.Label>
              <Form.Control
                type="url" placeholder="Insira a url da sua foto" name="foto" required
                value={usuario.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-6">Senha</Form.Label>
              <Form.Control
                type="password" placeholder="Insira sua senha" name="senha" required
                value={usuario.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-6">Confime a Senha</Form.Label>
              <Form.Control
                type="password" placeholder="Insira novamente a senha" name="confirmaSenha" required
                value={confirmaSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-center mt-2">
              <Button 
                onClick={retornar}
                variant="danger" 
                className="w-50 text-decoration-none text-light me-2 fs-6 btn-action">
                Cancelar
              </Button>

              <Button variant="primary" type="submit" className="w-50 fs-6 btn-action">
                Cadastrar
              </Button>
            </div>
          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default Cadastro