import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Col, Container } from 'react-bootstrap';

import Tema from "../../../models/Tema"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { toastAlerta } from "../../../utils/toastAlerta"

function DeletarTema() {
    const [tema, setTema] = useState<Tema>({} as Tema)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            } 
        })
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/temas")
    }

    async function deletarTema() {
        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Tema apagado com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar o Tema', 'erro')
        }

        retornar()
    }

    return (
        <Container fluid>
            <Col className='mt-2'>
                <Card>
                    <Card.Header>Deseja realmente apagar o tema a seguir?</Card.Header>
                    <Card.Body>
                        <Card.Title>{tema.descricao}</Card.Title>

                        <Button variant="primary" className="me-2" onClick={deletarTema}>Sim</Button>
                        <Button variant="danger" onClick={retornar}>Não</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}

export default DeletarTema