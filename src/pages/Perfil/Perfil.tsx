import { useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'

import { AuthContext } from "../../contexts/AuthContext"
import { toastAlerta } from "../../utils/toastAlerta"

function Perfil() {
    
    let navigate = useNavigate()
    
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toastAlerta('Você precisa estar logado', 'info')
            navigate("/login")
        }
    }, [usuario.token])

    return (
        <div>Perfil</div>
    )
}

export default Perfil