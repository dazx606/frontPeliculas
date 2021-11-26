import { useParams } from "react-router";

export default function DetallePelicula(){
    const {id} = useParams();
    
    return(
        <>
            <h1>Detalle de la Pelicula {id} </h1>
        </>
    );
}