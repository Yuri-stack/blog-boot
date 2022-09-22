import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import { Container } from "react-bootstrap"

function Footer() {

    const { usuario, handleLogout } = useContext(AuthContext)

    var componenteFooter

    if (usuario.token !== "") {
        componenteFooter =
            <Container
                as="footer"
                className="
                    d-flex justify-content-around align-items-center 
                    mw-100 m-0 bg-primary py-4"
            >
                <div className="d-flex flex-column align-items-center">
                    <h5 className="align-items-center text-light m-0">Siga-nos nas redes sociais</h5>

                    <div>
                        <a href="https://www.facebook.com/generationbrasil" className="text-light m-1 text-decoration-none" target="_blank">Facebook</a>
                        <a href="https://www.instagram.com/generationbrasil" className="text-light m-1 text-decoration-none" target="_blank">Instagram</a>
                        <a href="https://www.linkedin.com/school/generationbrasil" className="text-light m-1 text-decoration-none" target="_blank">LinkedIn</a>
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <p className="text-light fw-semibold m-0">© 2023 Copyright:</p>
                    <a href="https://brasil.generation.org" target="_blank" className="text-light text-decoration-none">brasil.generation.org</a>
                </div>
            </Container>
    }

    return (
        <>
            { componenteFooter }
        </>
    )
}

export default Footer