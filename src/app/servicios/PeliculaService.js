import { URL_API_PELICULAS } from "../config/config";
export function servicioBusquedaTitulo(titulo){
    
    const path = "/peliculas/getMovieByName/"+titulo;

    /*
    FETCH -> CARGAR RECURSOS EXTERNOS USANDO HTTP
        -> UTL + PATH
        -> CONFIG
            -> METODO HTTP
            -> MODO DE CONECCION -> CORS
            -> HEADERS -> INFO DEL CUERPO O TOKEN DE AUTORIZACION
            -> BODY -> CUERPO DE LA PETICION {JSON}
    */
   const config ={
        method:"GET",
        mode:"cors",
   }

   return fetch(URL_API_PELICULAS + path, config)
    .then(function(response){
        if(response.status===200){
            return response.json()
        }
        else{
            Promise.reject(response.statusText);
        }
    })
    .catch(function(error){
        console.log(error);
    });
}