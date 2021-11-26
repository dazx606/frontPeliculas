import {Switch, Route} from 'react-router-dom'
import ResultadoBusqueda from '../paginas/ResultadoBusqueda'
import DetallePelicula from '../paginas/DetallePelicula';

export default function Routes(){

    return(
        <Switch>
            <Route exact path="/" component={ResultadoBusqueda}/>
            <Route exact path="/detalle/:id" component={DetallePelicula}/>
        </Switch>
    );
}