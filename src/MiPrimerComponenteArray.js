function MiPrimerComponenteArray(props){
    
    /*
        props = {
            personas = [{},{},{}]
        }
        map -> iterar y devolver ese elemento modifiado
    */
    return (
        <>
            {props.personas.map(persona => (
                <>
                    <h3>Mi primer componente funcional</h3>
                    <span>{persona.firstName}{persona.lastName}</span>
                </>
            ))}
            
        </>
    )

}

export default MiPrimerComponenteArray;