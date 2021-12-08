import ListarPeliculas from "../componentes/Listarpeliculas";
import { useState, useEffect } from "react";
import * as PeliculasService from "../servicios/PeliculaService";
import FormularioActores from "../componentes/FormularioActores";
import FormGenetal from "../componentes/FormGeneral";
import "../estilos/formulario.css"

//#TODO refresh toquen

export default function AdministrarPeliculas(){

    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [ano,setAno] = useState('');
    const [tipo,setTipo] = useState('');
    const [rating,setRating] = useState('');
    const [clasificacion,setClasificacion] = useState('');
    const [poster,setPoster] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [actores,setActores] = useState([]);
    const [generos, setGeneros] = useState('');
    const [idiomas, setIdiomas] = useState('');
    const [paises, setPaises] = useState('');
    const [directores, setDirectores] = useState('');
    const [nominaciones, setNominaciones] = useState({cantidad:"",ganadas:""});

    useEffect(()=>{
        if(id){
            PeliculasService.servicioBusquedaId(id)
                .then(function(response){
                    const pelicula = response.data;

                    setTitulo(pelicula.titulo)
                    setAno(pelicula.ano)
                    setTipo(pelicula.rating)
                    setRating(pelicula.rating)
                    setClasificacion(pelicula.clasificacion)
                    setPoster(pelicula.poster)
                    setSinopsis(pelicula.sinopsis) 
                    setActores(pelicula.actores)
                    setGeneros(pelicula.generos)
                    setIdiomas(pelicula.idiomas)
                    setPaises(pelicula.paises)
                    setDirectores(pelicula.directores) 
                    setNominaciones(pelicula.nominaciones)
                })
        }
    },[id])

    function handleClickActores(evento){
        evento.preventDefault();
        const { name, value} = evento.target;
        if(name==="btn-adicionar"){
            const nuevosActores = [...actores,{nombre:"",apellido:""}];
            setActores(nuevosActores);
        }
        else{
            setActores(actores=>(
                actores.filter((actor,idx)=> idx !== parseInt(value))
            ))
        }
    }
    
    function handleChange(evento){
        const {name,value} = evento.target;
        switch (name){
            case 'titulo':
                setTitulo(value);
            break;
            case 'ano':
                setAno(value);
            break;
            case 'clasificacion':
                setClasificacion(value);
            break;
            case 'tipo':
                setTipo(value);
            break;
            case 'rating':
                setRating(value);
            break;
            case 'poster':
                setPoster(value);
            break;
            case 'sinopsis':
                setSinopsis(value);
            break;
        }
        
    }

    function handleClick(evento){
        evento.preventDefault();
        const dataMovie = {
            "titulo": titulo,
            "ano": ano,
            "rating": rating,
            "clasificacion": clasificacion,
            "poster": poster,
            "tipo": tipo,
            "sinopsis": sinopsis,
            "actores": actores,
            "generos": generos,
            "idiomas": idiomas,
            "paises": paises,
            "directores": directores,
            "nominaciones": nominaciones
        }
        if(id){
            PeliculasService.servicioActuaizarPelicula(id,dataMovie)
            .then(function(response){
                if(response.data.acknowledged){
                    alert(response.message)
                    setTitulo('');
                    setAno('');
                    setClasificacion('');
                    setPoster('');
                    setRating('');
                    setSinopsis('');
                    setTipo('');
                    setActores([]);
                    setGeneros('');
                    setIdiomas('');
                    setPaises('');
                    setDirectores('');
                    setNominaciones({cantidad:"",ganadas:""})
                }
                else{
                    alert(response.message)
                }
            })
            .catch(function(error){
                console.log(error);
            })
        }
        else{
            PeliculasService.servicioCrearPelicula(dataMovie)
            .then(function(response){
                if(response.data.acknowledged){
                    alert(response.message);
                    setTitulo('');
                    setAno('');
                    setClasificacion('');
                    setPoster('');
                    setRating('');
                    setSinopsis('');
                    setTipo('');
                    setActores([]);
                    setGeneros('');
                    setIdiomas('');
                    setPaises('');
                    setDirectores('');
                    setNominaciones({cantidad:"",ganadas:""})
                }
                else{
                    alert(response.message)
                }
            })
            .catch(function(error){
                console.log(error);
            }) 
        }

        
        
    }

    function handleChangeActores(evento){
        const index = parseInt(evento.target.name.split("-").pop());
        const propiedad = evento.target.name.split("-").shift();
        const {value} = evento.target;
        setActores(actores => (
            actores.map((actor, idx) => {
                if(idx === index){
                    return {...actor, [propiedad] : value}
                }
                else{
                    return actor;
                }
            })
        ));
    };

    function handleChangeNominaciones(evento){
        const {value, name} = evento.target;
        setNominaciones(nominaciones=>(
            {...nominaciones,[name] : value}
        ))
    }



    return(
        <>
            <fieldset>
                <legend>Administrar Peliculas</legend>
                <form>
                    <fieldset >
                        <div className="form-general">
                            <div>
                                <label htmlFor="titulo">Titulo: <br/></label>
                                <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label htmlFor="ano">Año: <br/></label>
                                <input type="text" id="ano" name="ano" value={ano} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label htmlFor="clasificacion">Clasificación: <br/></label>
                                <input type="text" id="clasificacion" name="clasificacion" value={clasificacion} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label htmlFor="rating">Rating: <br/></label>
                                <input type="text" id="rating" name="rating" value={rating} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label htmlFor="tipo">Tipo: <br/></label>
                                <input type="text" id="tipo" name="tipo" value={tipo} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label htmlFor="poster">Poster: <br/></label>
                                <input type="text" id="poster" name="poster" value={poster} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div >
                            <label htmlFor="sinopsis">Sinopsis: <br/></label>
                            <textarea className="area" rows="5" id="sinopsis" name="sinopsis" value={sinopsis} onChange={handleChange}></textarea>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Actores</legend>
                        <div>
                            <button type="button" name="btn-adicionar" className="btn-add" onClick={handleClickActores}>Adicionar Actores</button>
                        </div>
                        {actores && actores.map((actor,index)=>(
                            <FormularioActores
                                key={index}
                                id={index}
                                actor={actor}
                                onChange={handleChangeActores}
                                onClick={handleClickActores}
                            />
                        ))}
                    </fieldset>
                    <FormGenetal titulo="Géneros" id="generos" datos={generos} actualizar={setGeneros}/>
                    <FormGenetal titulo="Idiomas" id="idiomas" datos={idiomas} actualizar={setIdiomas}/>
                    <FormGenetal titulo="Paises" id="Paises" datos={paises} actualizar={setPaises}/> 
                    <FormGenetal titulo="Directores" id="Directores" datos={directores} actualizar={setDirectores}/>
                    <fieldset>
                        <legend>Nominaciones</legend>
                        <div>
                            <label htmlFor="cantidads">Cantidad:<br/> </label>
                            <input type="text" name="cantidad" id="cantidads" value={nominaciones.cantidad} onChange={handleChangeNominaciones}></input>
                        </div>
                        <div>
                            <label htmlFor="ganadas">Ganadas:<br/> </label>
                            <input type="text" name="ganadas" id="ganadas" value={nominaciones.ganadas} onChange={handleChangeNominaciones}></input>
                        </div>
                    </fieldset> 
                    <div className="btn-save">
                    <button type="button" onClick={handleClick} className="btn-save">Guardar</button>
                    </div>
                </form>
                <div>
                    <ListarPeliculas
                    setId={setId}/>
                </div>
            </fieldset>  
        </>  
    )   
}