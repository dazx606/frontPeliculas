import { URL_API_PELICULAS , getToken } from "../config/config";
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
            return Promise.reject(response.statusText);
        }
    })
    .catch(function(error){
        console.log(error);
    });
}

export function servicioBusquedaId(id){
    const path = "/peliculas/getMovieById/" + id;
    const config ={
        method : "GET",
        mode : "cors"
    }
    return fetch(URL_API_PELICULAS + path,config)
        .then(function(response){
            if(response.ok){
                return response.json();
                console.log(response)
            }
            else{
                return Promise.reject(response.statusText);
            }
        })
        .catch(function(error){
            console.log(error);
        })
}

export function servicioBusquedaPeliculas(){
    
    const path = "/peliculas/getMovies";
    const config = {
        method : "GET",
        mode: "cors",
        headers: {
            "authorization":"Bearer " + getToken()
        }
    }

    return fetch(URL_API_PELICULAS + path, config)
            .then(function(response){
                if(response.ok){
                    return response.json();
                }
                else{
                    return Promise.reject(response.statusText)
                }
            })
            .catch(function(error){
                console.log(error)
            })
}

export function servicioEliminarPelicula(id){
    const path="/peliculas/deleteMovie?id=" + id;
    const config = {
        method : "DELETE",
        mode : "cors",
        headers: {
            "authorization":"Bearer " + getToken()
        }
    }
    return fetch(URL_API_PELICULAS + path,config)
        .then(function(response){
            if (response.ok){
                return response.json();
            }
            else{
                return Promise.reject(response.statusText);
            }
        })
        
        .catch(function(error){
            console.log(error);
        })
        
}

export function servicioCrearPelicula(pelicula){
    const path="/peliculas/createMovie"
    const config = {
        method : "POST",
        mode : "cors",
        headers: {
            "authorization":"Bearer " + getToken(),
            "content-type":"application/json"
        },
        body : JSON.stringify(pelicula)
    }
    return fetch(URL_API_PELICULAS + path,config)
        .then(function(response){
            if (response.ok){
                return response.json();
            }
            else{
                return Promise.reject(response.statusText);
            }
        })
        
        .catch(function(error){
            console.log(error);
        })
}

export function servicioActuaizarPelicula(id, pelicula){

    const path = "/peliculas/updateMovie/" + id;
    const config = {
        method : "PUT",
        mode : "cors",
        headers: {
            "authorization":"Bearer " + getToken(),
            "content-type":"application/json"
        },
        body: JSON.stringify(pelicula)
    }
    return fetch(URL_API_PELICULAS + path,config)
        .then(function(response){
            if(response.ok){
                return response.json()
            }
            else{
                return Promise.reject(response.statusText)
            }
        })
        .catch(function(error){
            console.log(error);
        })
}