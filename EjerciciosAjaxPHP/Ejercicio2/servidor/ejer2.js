let boton = document.getElementById('comprobar');
let lista = document.getElementById("lista");
// let usuario = document.getElementById("login");
// let login = usuario.textContent;
//console.log("gdfgsdg")

boton.addEventListener("click", comprobarDisponibilidad);
function comprobarDisponibilidad(){
    fetch('http://javiercamposcuesta.loc/Ejercicio2/servidor/compruebaDisponibilidadXML.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos =>{
        const parser = new DOMParser();
        const xml = parser.parseFromString(datos, "application/xml");
        let disponibleEtiqueta = xml.getElementsByTagName("disponible");
        let disponible = disponibleEtiqueta[0].textContent;
        
        if (disponible == "si") {
            // let resultado = document.createElement("li");
            // resultado.innerHTML="El nombre está disponible";
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
        
            // Posible forma de pasarle login
        // window.location.href = window.location.href + "?login=" + login;
        let alternativas = xml.getElementsByTagName('login');
        for (let i = 1; i < alternativas.length; i++) {
            //Recogemos cada opcion del php
            let opcion = alternativas[i];

            //Creamos los elementos necesarios 
            let liOpcion = document.createElement('li');
            liOpcion.classList.add("sinDecoracion")
            let enlaceOpcion = document.createElement("a");
            enlaceOpcion.setAttribute("name", "a");
            enlaceOpcion.classList.add("enlace","disponible");
            enlaceOpcion.setAttribute("href", "#")
            enlaceOpcion.textContent = opcion.textContent+login;

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