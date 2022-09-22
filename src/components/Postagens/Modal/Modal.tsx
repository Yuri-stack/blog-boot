import { useState } from 'react'
import { Button, Modal as ModalBoot, ModalFooter, ModalBody } from 'react-bootstrap';
import FormularioPostagem from '../FormulatioPostagem/FormularioPostagem';

import './Modal.css'

function Modal() {
    const [mostrar, setMostrar] = useState(false);

    function mostrarEsconderModal(){
        setMostrar(!mostrar)
    }

    return (
        <>
            <Button variant="primary" onClick={mostrarEsconderModal} className="border border-white me-2">
                Nova Postagem
            </Button>

            <ModalBoot show={mostrar} onHide={mostrarEsconderModal}>
                <ModalBoot.Body className="x">
                {/* <ModalBoot.Body> */}
                    <FormularioPostagem />
                </ModalBoot.Body>
            </ModalBoot>
        </>
    )
}

export default Modal