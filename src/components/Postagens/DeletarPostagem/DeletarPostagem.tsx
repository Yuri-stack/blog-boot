import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Col, Container } from 'react-bootstrap';

import Postagem from '../../../models/Postagem';
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { toastAlerta } from "../../../utils/toastAlerta"

function DeletarPostagem() {
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
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
        navigate("/postagens")
    }

    async function deletarPostagem() {
        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar a Postagem', 'erro')
        }

        retornar()
    }

    return (
        <Container fluid>
            <Col className='mt-2'>
                <Card>
                    <Card.Header>Deseja realmente apagar a postagem a seguir?</Card.Header>
                    <Card.Body>
                        <Card.Title>{postagem.titulo}</Card.Title>
                        <Card.Text>{postagem.texto}</Card.Text>

                        <Button variant="primary" className="me-2" onClick={deletarPostagem}>Sim</Button>
                        <Button variant="danger" onClick={retornar}>Não</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}

export default DeletarPostagem