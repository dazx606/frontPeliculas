import { useState, useEffect } from "react";
import Resultados from "../componentes/Resultados";
import '../estilos/resultadosBusqueda.css'
import * as PeliculaService from '../servicios/PeliculaService' 

function ResultadoBusqueda(){
    //definir estados
    const [busqueda, setBusqueda] = useState('');
    const [resultado, setResultado] =useState([]);

    useEffect(() =>{
        //Realiza una comparacion de busqueda anterior con la nueva busqueda en caso de ser diferentes realiza el efecto
        //no cambiar el estado de la misma variable o componente que estamos controlando
        if(busqueda.length >= 3){
            PeliculaService.servicioBusquedaTitulo(busqueda)
                .then(function(resultadosBusqueda){
                    setResultado(resultadosBusqueda.data)

                })
                .catch(function(error){
                    console.log(error);
                }) 
        }
        else{
            setResultado([]);
        }
        
    },[busqueda])
    
    
    //handleSubmitFormularioN -> manejadro de evento

    function handleSubmit(evento){
        evento.preventDefault();
    }

    function handleChange(evento){
        let tituloPelicula = evento.target.value;
        
        setBusqueda(tituloPelicula)
    }

    return (
        <>
            <div className="dv-busqueda">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Buscar Pelicula</legend>
                        <input type="text" id="busqueda" name="busqueda" onChange={handleChange} placeholder="Busqueda Por Titulo"/>
                    </fieldset>
                </form>
            </div>
            <div>
                <fieldset>
                    <legend>Listado de películas</legend>
                    <div><span>Mostando resultados para: {busqueda}</span></div>
                    <div className="dv-resultados">
                        {resultado && resultado.length > 0 && resultado.map(pelicula => (
                            <Resultados pelicula = {pelicula}/> ))
                        }
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default ResultadoBusqueda;