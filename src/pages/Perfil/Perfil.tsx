import { useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { Button, Container, Col, Form } from "react-bootstrap"

import { AuthContext } from "../../contexts/AuthContext"
import { toastAlerta } from "../../utils/toastAlerta"

import './Perfil.css'

function Perfil() {

    let navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toastAlerta('Você precisa estar logado', 'info')
            navigate("/login")
        }
    }, [usuario.token])

    return (
        <Container>
            <Col className="
                    d-flex flex-column mt-3 bg-primary
                    justify-content-center align-items-center 
                    perfil-container"
            >
                <img className="perfil-capa " src="https://i.imgur.com/d5bMdDJ.jpg" alt="Capa do Perfil" />

                <div className="d-flex flex-column align-items-center">
                    <img
                        className="perfil-foto"
                        src={usuario.foto}
                        alt={`Foto de ${usuario.nome}`}
                    />

                    <div className="perfil-titulos">
                        <p className="m-0">Nome: {usuario.nome}</p>
                        <p className="m-0">Email: {usuario.usuario}</p>
                    </div>
                </div>

            </Col>
        </Container>
    )
}

export default Perfil