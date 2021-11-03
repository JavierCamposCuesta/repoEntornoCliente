let boton = document.getElementById('comprobar');
let disponibilidad = document.getElementById("disponibilidad");


boton.addEventListener("click", comprobarDisponibilidad);
function comprobarDisponibilidad(){

fetch('http://javiercamposcuesta.loc/Ejercicio1/servidor/compruebaDisponibilidad.php')
.then(response => {
    if (response.ok) {
        return response.text();
    }
    return Promise.reject(response);
})
.then(datos =>{
    if (datos=="si") {
        disponibilidad.innerHTML="El nombre está dispobible";
        disponibilidad.classList.remove("noDisponible");
        disponibilidad.classList.add("disponible");
    }
    else{
        disponibilidad.innerHTML="El nombre no está dispobible";
        disponibilidad.classList.remove("disponible");
        disponibilidad.classList.add("noDisponible");
    }
    
})
.catch(console.log("Error: " + response.error))
}