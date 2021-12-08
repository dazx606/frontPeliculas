const pruebas = async ()=>{
    
    let response = await fetch("https://misiontic2022upb.vercel.app/api/emission-measurement/ranges-parameters");
    let limits = await response.json();
    console.log(limits);
}

pruebas()