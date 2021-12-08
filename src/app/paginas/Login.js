import { useState } from "react"
import * as UsuariosService from "../servicios/UsuariosService"
import { useHistory } from "react-router";

export default function Login(props){

    const [usuario, setUsuario] = useState(''); //desestructuracion de un array
    const [clave, setClave] = useState('');
    let history = useHistory();

    function handleChange(evento){
        let {name,value} = evento.target; //desestructuracion de un objeto
                //target carga el html de donde se manda el evento 
                //--><input type="text" id="usuario" name="usuario" value={usuario} onChange={handleChange}></input>
        if (name === "usuario"){
            setUsuario(value);
        }
        else{
            setClave(value);
        }
    }

    function handleClick(evento){
        evento.preventDefault();
        UsuariosService.ServicioIniciarSesion(usuario,clave)
            .then(function(findUser){
                if(findUser.token){
                    const datosSesion = {
                        "nombre" : findUser.data.name,
                        "roles" : findUser.data.roles,
                        "token" : findUser.token
                    }

                    localStorage.setItem('auth', JSON.stringify(datosSesion));

                    props.autenticado(datosSesion);

                    history.push("/administrar");
                }
            })

    }

    return(
        <>
            <form>
                <fieldset>
                    <legend>Iniciar Sesión</legend>
                    <div>
                        <label htmlFor="usuario">Usuario: </label>
                        <input type="text" id="usuario" name="usuario" value={usuario} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="clave">Contraseña: </label>
                        <input type="password" id="clave" name="clave" value={clave} onChange={handleChange}></input>
                    </div>
                    <div>
                        <button type="button" onClick={handleClick}>Iniciar Sesión</button>
                    </div>
                </fieldset>
            </form>
        </>
    )
}