import'../estilos/resultado.css'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'



export default function Resultados(props){

    let history=useHistory();
    
    function handleClick(evento){
        evento.stopPropagation()
        history.push("/detalle/"+props.pelicula._id)
    }


    return ( 
        <>
            <div className="dv-pelicula" onClick={handleClick}>
                <div className="dv-poster" >
                    <img  src={props.pelicula.poster}></img>
                </div>
                <div>
                    <h3>{props.pelicula.titulo}</h3>
                </div>
                <div>
                    <p>{props.pelicula.sinopsis}</p>
                </div>
                <div>
                    <span>                   
                        {props.pelicula.rating}
                        <FontAwesomeIcon icon ={faStarHalfAlt} />
                    </span>
                </div>
            </div>
        </>
    );

}