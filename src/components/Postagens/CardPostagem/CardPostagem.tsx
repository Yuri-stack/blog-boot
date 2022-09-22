import { Link } from "react-router-dom"

import { Button, Card, Col } from 'react-bootstrap';

import Postagem from "../../../models/Postagem"

interface CardPostagemProps {
  post: Postagem
}

function CardPostagem({ post }: CardPostagemProps) {
  return (
    <Col>
      <Card>
        <Card.Header>Postagem</Card.Header>
        <Card.Body>
          <Card.Title>{post.titulo}</Card.Title>
          <Card.Text>{post.texto}</Card.Text>

          <footer>Postado por: {post.usuario?.nome}</footer>

          <div className="mt-3">
            <Link to={`/formularioPostagem/${post.id}`}>
              <Button variant="primary" className="me-2">Atualizar</Button>
            </Link>

            <Link to={`/deletarPostagem/${post.id}`}>
              <Button variant="danger">Deletar</Button>
            </Link>
          </div>

        </Card.Body>
      </Card>
    </Col>
  )
}

export default CardPostagem