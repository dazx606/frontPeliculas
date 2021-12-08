import { useState,useEffect } from "react";
import * as PeliculasService from "../servicios/PeliculaService"

export default function ListarPeliculas(props){

    const [peliculas,setPeliculas] = useState([])
    useEffect(()=>{
        PeliculasService.servicioBusquedaPeliculas()
        .then(function(ResultadoBusqueda){
            setPeliculas(ResultadoBusqueda.data);
        })
        .catch(function(error){
            console.log(error);
        })
    },[]) //CAMBIAR POR [] EN CASO DE QUE SE QUIERA VOLVER A RENDERIZAR EL LISTADO CON EL FILTER

    function handleClick(evento){
        const {name, value} = evento.target;
        const id_pelicula = value;
        switch(name){
            case 'btn-editar':
                props.setId(id_pelicula)
                
            break;

            case 'btn-eliminar':
                PeliculasService.servicioEliminarPelicula(id_pelicula)
                    .then(function(response){
                        if(response.data.acknowledged){
                            alert(response.message)
                            //setPeliculas('')   
                            setPeliculas(peliculas=>(
                                peliculas.filter(pelicula  => pelicula._id != id_pelicula)
                            ))  //CAMBIAR EN LISTAR PELICULAS EFECTO POR UN [] 
                        }      
                        else{
                            alert(response.message)
                        }
                    })
            break;
        }
    }
    
  

    return(
        <>
            <table className="tabla">
                <thead>
                    <tr className="titulos">
                        <td>Película</td>
                        <td>Año</td>
                        <td>Clasificación</td>
                        <td>Rating</td>
                        <td>Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {peliculas && peliculas.map(pelicula =>(
                        <tr key={pelicula._id} >
                            <td>{pelicula.titulo}</td>
                            <td>{pelicula.ano}</td>
                            <td>{pelicula.clasificacion}</td>
                            <td>{pelicula.rating}</td>
                            <td>
                                <button type="button" name="btn-editar" value={pelicula._id} onClick={handleClick}>Editar</button>
                                <button type="button" name="btn-eliminar" value={pelicula._id} onClick={handleClick}>Eliminar</button>
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
        </>
    );
}