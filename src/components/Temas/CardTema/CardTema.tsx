import { Link } from "react-router-dom"

import { Button, Card, Col } from 'react-bootstrap';

import Tema from "../../../models/Tema"

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <Col>
      <Card>
        <Card.Header>Tema</Card.Header>
        <Card.Body>
          <Card.Title>{tema.descricao}</Card.Title>

          <div>
            <Link to={`/formularioTema/${tema.id}`}>
              <Button variant="primary" className="me-2">Atualizar</Button>
            </Link>

            <Link to={`/deletarTema/${tema.id}`}>
              <Button variant="danger">Deletar</Button>
            </Link>
          </div>

        </Card.Body>
      </Card>
    </Col>
  )
}

export default CardTema