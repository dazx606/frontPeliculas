import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DetalleActores from '../componentes/DetalleActores'
import DetalleNominaciones from "../componentes/DetalleNominaciones";
import DetalleGeneral from "../componentes/DetalleGeneral";
import "../estilos/detallePelicula.css"
import * as PeliculaService from '../servicios/PeliculaService'

export default function DetallePelicula(){
    const {id} = useParams();
    const [pelicula,setPelicula] = useState({});
    
    useEffect(()=>{
        PeliculaService.servicioBusquedaId(id)
            .then(function(resultadoBusqueda){
                setPelicula(resultadoBusqueda.data)
            })
    },[id])

    /*
        1. DATOS EXTERNOS...
            -> ID PELICULA -> parametros 
        2. ESTADOS / PROPIEDADES
            -> Estados
                -> Pelicula
        3. EFECTOS 
            -> useeffect() -> montaje
        4. COMPONENTES
            -> DetalleActores -> array de objetos . Titulo
            -> DetalleNominacion -> Objetos . Titulo
            -> DetalleGeneral -> Array  . Titulo
    */
    
    return(
        <>
            <div className="dv-detalle-detalle">
                <fieldset>
                    <legend>Detalle Película</legend>
                    <h1>{pelicula.titulo}</h1>
                    <div className="dv-main-detalle">
                        <div className="dv-poster-detalle">
                            <img alt="poster" src={pelicula.poster}></img>
                        </div>
                        <div>
                        <div>
                            <fieldset>
                                <legend>Año</legend>
                                <span>{pelicula.ano}</span>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset>
                                    <legend>Rating</legend>
                                    <span>{pelicula.rating}</span>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset>
                                    <legend>Clasificación</legend>
                                    <span>{pelicula.clasificacion}</span>
                            </fieldset>
                        </div>
                        </div>
                        <div>
                            <p>{pelicula.sinopsis}</p>
                        </div>
                    </div>
                
                </fieldset>
                <fieldset>
                    <legend>Detalle</legend>
                    <DetalleActores titulo="Actores" datos={pelicula.actores}/>
                    <div className="dv-datos-detalle" >
                        <DetalleGeneral titulo="Géneros" datos={pelicula.generos} />
                        <DetalleGeneral titulo="Idiomas" datos={pelicula.idiomas}/>
                        <DetalleGeneral titulo="Países" datos={pelicula.paises}/>
                        <DetalleNominaciones titulo="Nominaciones" datos={pelicula.nominaciones}/>
                    </div>
                    <DetalleGeneral titulo="Directores" datos={pelicula.directores}/>
                </fieldset>
            </div>
        </>
    );
}