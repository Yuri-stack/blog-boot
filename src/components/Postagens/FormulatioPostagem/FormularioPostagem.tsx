import { ChangeEvent, useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Col, Form } from "react-bootstrap"

import Tema from "../../../models/Tema"
import Postagem from "../../../models/Postagem"
import { AuthContext } from "../../../contexts/AuthContext"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { toastAlerta } from "../../../utils/toastAlerta"

function FormularioPostagem() {

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null
    })

    async function buscarPostagemPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function buscarTemas() {
        await buscar("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario
        })
    }

    function retornar() {
        navigate("/postagens")
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log(postagem)

        if (id != undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Postagem atualizada com sucesso', 'sucesso')
                retornar()

            } catch (error) {
                toastAlerta('Erro ao atualizar a Postagem', 'erro')
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Postagem cadastrada com sucesso', 'sucesso')
                retornar()

            } catch (error) {
                toastAlerta('Erro ao cadastrar a Postagem', 'erro')
            }
        }
    }

    const carregandoTema = tema.descricao === ""

    return (
        <Container fluid>
            <Col className="d-flex flex-column justify-content-center align-items-center mt-5">

                <h1 className="text-center">Formulário de Postagem</h1>

                <Form onSubmit={gerarNovaPostagem} className="w-50">

                    <Form.Group className="mb-3">
                        <Form.Label className="fs-6">Título</Form.Label>
                        <Form.Control
                            type="text" placeholder="Insira no mínimo 5 caracteres" name="titulo" required
                            value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fs-6">Texto</Form.Label>
                        <Form.Control
                            type="text" placeholder="Insira no mínimo 10 caracteres" name="texto" required
                            value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </Form.Group>

                    <Form.Label className="fs-6">Tema</Form.Label>
                    <Form.Select className="mb-3" onChange={(e) => buscarTemaPorId(e.target.value)}>
                        <option>Escolha um Tema abaixo</option>

                        {
                            temas.map(item => (
                                <option key={item.id} value={item.id}>{item.descricao}</option>
                            ))
                        }
                    </Form.Select>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        className="fs-6"
                        disabled={carregandoTema}
                    >
                        { carregandoTema ? <span>Carregando</span> : <span>Concluir</span>}
                        
                    </Button>
                </Form>

            </Col>
        </Container>
    )
}

export default FormularioPostagem