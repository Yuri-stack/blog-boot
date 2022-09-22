import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Navbar as NavbarBoot, Container } from "react-bootstrap"

import { AuthContext } from "../../contexts/AuthContext"
import { toastAlerta } from "../../utils/toastAlerta"

function Navbar() {

    let navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        toastAlerta('Usuário deslogado com sucesso', 'info')
        navigate('/login')
    }

    var componenteNavbar

    if (usuario.token !== "") {
        componenteNavbar = 
            <NavbarBoot bg="primary" variant="dark">
                <Container>
                    <NavbarBoot.Brand className="fs-4">Blog Pessoal</NavbarBoot.Brand>

                    <NavbarBoot.Collapse className="justify-content-end">

                        <NavbarBoot.Text className="mx-2 fs-5">
                            <Link to="/" className="text-decoration-none">Home</Link>
                        </NavbarBoot.Text>

                        <NavbarBoot.Text className="mx-2 fs-5">
                            <Link to="/formularioTema" className="text-decoration-none">Cadastrar Tema</Link>
                        </NavbarBoot.Text>

                        <NavbarBoot.Text className="mx-2 fs-5">
                            <Link to="/temas" className="text-decoration-none">Temas</Link>
                        </NavbarBoot.Text>
                        
                        <NavbarBoot.Text className="mx-2 fs-5">
                            <Link to="/postagens" className="text-decoration-none">Postagens</Link>
                        </NavbarBoot.Text>

                        <NavbarBoot.Text className="mx-2 fs-5">
                            <Link to="/perfil" className="text-decoration-none">Perfil</Link>
                        </NavbarBoot.Text>

                        <NavbarBoot.Text 
                            role="button" 
                            onClick={logout}
                            className="mx-2 fs-5 text-white"
                        >
                            Logout
                        </NavbarBoot.Text>

                    </NavbarBoot.Collapse>

                </Container>
            </NavbarBoot>
    }

    return (
        <>
            { componenteNavbar }
        </>
    )
}

export default Navbar