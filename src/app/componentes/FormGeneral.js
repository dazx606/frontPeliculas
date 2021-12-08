import { useState } from "react";

export default function FormGenetal(props){

    const [etiqueta,setEtiqueta] = useState('')

    function handleChange(evento){
        const {value} = evento.target;
        setEtiqueta(value);
    }

    function handleClick(evento){
        
        evento.preventDefault();
        //setGeneros
        const {name, value} = evento.target;
        if(name==="btn-adicionar"){
            props.actualizar(datos => (
                [...datos, etiqueta]
            ))
            setEtiqueta('')
        }
        else{
            props.actualizar(datos=>(
                datos.filter((dato,idx) => idx !== parseInt(value) )
            ))
        }
        
    }

    return(
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                <div>
                    
                    <input type="text" name={props.titulo} id={props.titulo} value={etiqueta} onChange={handleChange}></input>
                    <button type="button" name="btn-adicionar" className="btn-add" onClick={handleClick}>Adicionar {props.titulo}</button>
                </div>
                <div>
                    {props.datos && props.datos.map((dato,idx)=>(
                        <button className="btn-add" key={idx} name="eliminar" value={idx} onClick={handleClick}>{dato}</button>
                    ))}
                </div>
            </fieldset>
        </>
    );
    
}