import '../estilos/header.css'
import { useHistory } from 'react-router';

export default function Header(props){

    let history = useHistory();

    function handleClick(evento){
        const {name} = evento.target;
        if (name === "btn-iniciar"){
            history.push("/login")
        }
        else{
            localStorage.removeItem('auth')
            props.autenticado(null)
            history.push("/")
        }
    }

    return(
        <>
            <div className="header">
                {props.usuario ? 
                    (<button type="button" name="btn-cerrar" onClick={handleClick}>Cerrar Sesión</button>):
                    (<button type="button" name="btn-iniciar" onClick={handleClick}>Iniciar Sesión</button>)
                }
                
                
            </div>
            {props.children}
        </>
    );
}