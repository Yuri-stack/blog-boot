import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap';

import Tema from '../../../models/Tema'
import { buscar } from '../../../services/Service'
import { toastAlerta } from '../../../utils/toastAlerta'
import { AuthContext } from '../../../contexts/AuthContext'
import CardTema from '../CardTema/CardTema'

function ListaTemas() {
    const [temas, setTemas] = useState<Tema[]>([])

    let navigate = useNavigate()

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    async function buscarTemas() {
        await buscar('/temas', setTemas, {
            headers: { 'Authorization': token }
        })
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    return (
        <Container className='p-2'>
            <Row xs={1} md={2} className="g-2">
                {
                    temas.map(tema => (
                        <CardTema key={tema.id} tema={tema} />
                    ))
                }
            </Row>
        </Container>
    )
}

export default ListaTemas