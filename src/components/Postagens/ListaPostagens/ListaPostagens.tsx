import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { Container, Row } from 'react-bootstrap';

import Postagem from "../../../models/Postagem"
import { buscar } from "../../../services/Service"
import CardPostagem from "../CardPostagem/CardPostagem"
import { toastAlerta } from "../../../utils/toastAlerta"

function ListaPostagens() {
    const [postagens, setPostagens] = useState<Postagem[]>([])

    let navigate = useNavigate() 

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPostagens() {
        await buscar("/postagens", setPostagens, {
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
        buscarPostagens()
    }, [postagens.length])

    return (
        <Container fluid className='p-2'>
            <Row xs={1} md={2} className="g-2">
                {
                    postagens.map(postagem => (
                        <CardPostagem key={postagem.id} post={postagem} />
                    ))
                }
            </ Row>
        </ Container>
    )
}

export default ListaPostagens