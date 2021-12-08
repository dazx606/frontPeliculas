import { URL_API_PELICULAS } from "../config/config";

export function ServicioIniciarSesion(usuario,clave){

    const path = "/usuarios/login?user="+ usuario + "&password=" + clave;

    const config ={
        method : "GET",
        mode : "cors"
    }

    return fetch(URL_API_PELICULAS + path,config)
        .then(function(response){
            if(response.ok){
                return response.json();
            }
            else{
                return Promise.reject(response.statusText)
            }
        })
        .catch(function(error){
            console.log(error);
        })

}



