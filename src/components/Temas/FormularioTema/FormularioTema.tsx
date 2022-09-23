import { ChangeEvent, useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Col, Form } from "react-bootstrap"

import Tema from "../../../models/Tema"
import { AuthContext } from "../../../contexts/AuthContext"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { toastAlerta } from "../../../utils/toastAlerta"

function FormularioTema() {
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })

        console.log(JSON.stringify(tema))
    }

    function retornar() {
        navigate("/temas")
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema atualizado com sucesso', 'sucesso')
                retornar()

            } catch (error) {
                toastAlerta('Erro ao atualizar o Tema', 'erro')
            }

        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema cadastrado com sucesso', 'sucesso')

            } catch (error) {
                toastAlerta('Erro ao cadastrado o Tema', 'erro')
            }
        }

        retornar()
    }

    return (
        <Container fluid>
            <Col className="d-flex flex-column justify-content-center align-items-center mt-5">

                <h1 className="text-center">Formulário de Tema</h1>

                <Form onSubmit={gerarNovoTema} className="w-50">
                    <Form.Group className="mb-3">
                        <Form.Label className="fs-6">Nome/Descrição:</Form.Label>
                        <Form.Control
                            type="text" placeholder="Insira no mínimo 5 caracteres" name="descricao" required
                            value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className=" fs-6 btn-action">
                        Concluir
                    </Button>
                </Form>

            </Col>
        </Container>
    )
}

export default FormularioTema