let boton = document.getElementById('comprobar');
let lista = document.getElementById("lista");

const opciones = {
    method:"GET"
}

boton.addEventListener("click", comprobarDisponibilidad);
function comprobarDisponibilidad(){
    let login = document.getElementById("login");
    let nombreIntroducido = login.value;
    fetch('http://javiercamposcuesta.loc/Ejercicio3/servidor/compruebaDisponibilidadJSON.php', opciones)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    })
    .then(datos =>{
        let respuesta = datos;

        
        
        if (respuesta.disponible == "si") {
            lista.innerHTML="Nombre dispobible";
            lista.classList.remove("noDisponible");
            lista.classList.add("disponible");
        }
        
        else{
        let usuario = document.getElementById("login");
        let login = usuario.value;

        lista.innerHTML="Nombre no dispobible. Sugerencias:";
        lista.classList.remove("disponible");
        lista.classList.add("noDisponible");
        
           
        
        for (let i = 1; i < respuesta.alternativas.length; i++) {
            
            
            
            //Creamos los elementos necesarios 
            let liOpcion = document.createElement('li');
            liOpcion.classList.add("sinDecoracion")
            let enlaceOpcion = document.createElement("a");
            enlaceOpcion.setAttribute("name", "a");
            enlaceOpcion.classList.add("enlace","disponible");
            enlaceOpcion.setAttribute("href", "#")
            enlaceOpcion.textContent = nombreIntroducido+respuesta.alternativas[i];

            //Añadimos cada a al li
            liOpcion.appendChild(enlaceOpcion);
        
            //Añadimos cada li a la lista
            lista.appendChild(liOpcion);
            
        }
        
    }
    
    
})
.catch(console.log("Error: " + response.error))
}


//Creamos un evento generico para la lista, y en ella comprobamos que el elemento sea un a
lista.addEventListener("click", (e)=>{
    if(e.target.name=="a"){
        login.value=e.target.textContent;

    }
})