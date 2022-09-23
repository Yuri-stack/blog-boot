import { Link } from "react-router-dom"

import { Container, Col, Row, Button } from "react-bootstrap"
import Modal from "../../components/Postagens/Modal/Modal"
import TabPostagem from "../../components/Postagens/TabPostagem/TabPostagem"

function Home() {
  return (
    <Container fluid>
      <Row className="bg-primary">
        
        <Col xs={12} sm={6} className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-light text-center fw-semibold">Seja Bem Vinde!</h2>
          <h4 className="text-light text-center">Expresse aqui seus pensamentos e opiniões!</h4>

          <div className="d-flex justify-content-center">
            <Modal />

            <Link to={`/postagens`}>
              <Button className="border border-white">Ver Postagens</Button>
            </Link>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <img
            src="https://imgur.com/4qzZQ5c.png"
            alt="Três pessoas sentadas conversando"
            width="500px" height="500px"
          />
        </Col>

        <Col xs={12} sm={6} 
          className="
            d-flex flex-column justify-content-center 
            w-75 mx-auto">
          <TabPostagem />
        </Col>

      </Row>
    </Container>
  )
}

export default Home