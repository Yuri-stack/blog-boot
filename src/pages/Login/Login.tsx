import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Button, Container, Col, Form, Row } from "react-bootstrap"

import { Link, useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import UsuarioLogin from "../../models/UsuarioLogin"

import './Login.css'

function Login() {

    let navigate = useNavigate()

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

    const { usuario, handleLogin } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <Container fluid>
            <Row>
                <Col className="d-flex flex-column justify-content-center align-items-center">

                    <h1 className="text-center">Entrar</h1>

                    <Form onSubmit={login} className="w-50">

                        <Form.Group className="mb-3">
                            <Form.Label className="fs-6">Usuário</Form.Label>
                            <Form.Control
                                type="email" placeholder="Insira o seu email" name="usuario"
                                value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="fs-6">Senha</Form.Label>
                            <Form.Control
                                type="password" placeholder="Insira sua senha" name="senha"
                                value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-4">
                            <Button variant="primary" type="submit" className="w-50 fs-6">Logar</Button>
                        </div>
                    </Form>

                    <div className="d-flex justify-content-center mt-3">
                        <h6 className="text-center me-2">Não tem uma conta?</h6>
                        <h6 className="text-center fw-bold">
                            <Link className="text-decoration-none" to='/cadastro'>Cadastre-se</Link>
                        </h6>
                    </div>
                </Col>

                <Col className="bg-login" />
            </Row>
        </Container>
    )
}

export default Login
