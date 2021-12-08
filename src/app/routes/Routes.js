import { useState } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import ResultadoBusqueda from '../paginas/ResultadoBusqueda'
import DetallePelicula from '../paginas/DetallePelicula';
import Login from '../paginas/Login';
import AdministrarPeliculas from '../paginas/AdministrarPeliculas';
import Header from '../componentes/Header';

/*
    COMPONENTES EMBOLVENTES -> WRAPPERS

    <COMPONENTE SUPERIOR> - props.children>
        <COMPONENTE INFERIOS/>
    <COMPONENTE SUPERIOS/>
 */


export default function Routes(){

    const auth = JSON.parse(localStorage.getItem('auth'));
    const [usuario, setUsuario] = useState (auth)

    return(

        <Switch>
            <Header usuario={usuario} autenticado={setUsuario}>
                <Route exact path="/" component={ResultadoBusqueda}/>
                <Route path="/detalle/:id" component={DetallePelicula}/>
                <Route path="/login" >
                    <Login autenticado={setUsuario}/>
                </Route>    
                <Route path="/administrar">
                    {usuario ? <AdministrarPeliculas/>: <Redirect to="/login"/>} 
                </Route>
            </Header>
        </Switch>
    );
}