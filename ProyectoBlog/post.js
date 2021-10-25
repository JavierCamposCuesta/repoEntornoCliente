let titulo = document.getElementById("titulo");
let cuerpo = document.getElementById("cuerpo");
let fechaCreacion = document.getElementById("fecha");
let autor = document.getElementById("autor");


//Mostrar todos los posts
//Obtenemos el id que lleva la url y lo almacenamos en idParametro
let url = window.location.search;
let urlParametros = new URLSearchParams(url);
let idParametro = urlParametros.get('id');

//Creamos la url necesaria para que muestre el post
let urlFinal="http://localhost:3000/posts/"+idParametro;


let peticion = new XMLHttpRequest();
console.log("Estado inicial de la petición: " + peticion.readyState);

peticion.open('GET', urlFinal);
console.log("Estado de la petición tras el 'open': " + peticion.readyState);
peticion.send();
console.log("Petición hecha");
peticion.addEventListener('readystatechange', function() {
console.log("Estado de la petición: " + peticion.readyState);
if (peticion.readyState === 4) {
    console.log("Peticion status"+peticion.status)
if (peticion.status === 200) {

console.log("Datos recibidos:");
let usuarios = JSON.parse(peticion.responseText); // Convertirmos los datos JSON a un objeto
//Cargamos cada dato en su etiqueta
titulo.innerHTML=usuarios.title;
cuerpo.innerHTML=usuarios.body;
autor.innerHTML=usuarios.author;
fechaCreacion.innerHTML=usuarios.date;

console.log(usuarios);
} else {
console.log("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
}
}
})
console.log("Petición acabada");


//Mostramos todos los comentarios asociados a este post
let tabla = document.getElementById("tabla");

let urlComentario="http://localhost:3000/comments?postId="+idParametro;
let peticion2 = new XMLHttpRequest();
peticion2.open('GET', urlComentario);
peticion2.send();
peticion2.addEventListener('readystatechange', function() {
    console.log("Estado de la petición: " + peticion.readyState);
    if (peticion2.readyState === 4) {
    if (peticion2.status === 200) {
    console.log("Datos recibidos:");

    

    let usuarios = JSON.parse(peticion2.responseText); // Convertirmos los datos JSON a un objeto
    
    
    array.forEach(element => {
        
    });
    for(i = 0; i< usuarios.length; i++){
        tabla.insertRow(-1).innerHTML = '<tr' + '<td>' + usuarios[i].body + '</td>' +
        '<td  class="tdAutor">' + usuarios[i].nick + '</td></tr>';
       
       
    }
    
    console.log(usuarios);
    } else {
    console.log("Error " + peticion2.status + " (" + peticion2.statusText + ") en la petición");
    }
    }
    });


//Leemos para hacer la seleccion de todos los perfiles

let peticion3 = new XMLHttpRequest();
peticion3.open('GET', "http://localhost:3000/profile");
peticion3.send();
peticion3.addEventListener('readystatechange', function() {
    console.log("Estado de la petición: " + peticion3.readyState);
    if (peticion3.readyState === 4) {
        if (peticion3.status === 200) {
            console.log("Datos recibidos:");
            
            
            
            let usuarios = JSON.parse(peticion3.responseText); // Convertirmos los datos JSON a un objeto
            let listaComentadores = document.getElementById("listaComentadores");
            
            
            for(i = 0; i< usuarios.length; i++){
        let option = document.createElement('option');
        let valor = (i+2);
        let texto = usuarios[i].name;
        option.value=valor;
        option.text=texto;
        listaComentadores.appendChild(option);

       
       
    }
    
    
    } else {
    console.log("Error " + peticion3.status + " (" + peticion3.statusText + ") en la petición");
    }
    }
    }); 
    
    //Subimos el comentario---------------------------------
    let form = document.getElementById("form");
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        subirComentario()});

    let boton = document.getElementById("boton");
    let comentario = document.getElementById("comentario");
    let listaComentadores = document.getElementById("listaComentadores");
    let indiceOption = 0;

    //Creamos un evente para cuando se cambie la seleccion del autor
    listaComentadores.addEventListener("change", ()=>{indiceOption=listaComentadores.selectedIndex;});
    
    function subirComentario(){
        //Evaluamos que el campo del comentario no esté vacio
        if(comentario.value.length>0){
            const newComment={
                body: comentario.value,
                nick: listaComentadores.options[indiceOption].text,
                //Utilizamos el idParametro que nos tragimos al principio
                postId: parseInt(idParametro)
                
            } 
            const peticion4=new XMLHttpRequest();
            peticion4.open('POST', 'http://localhost:3000/comments');
            peticion4.setRequestHeader('Content-type', 'application/json');  // Siempre tiene que estar esta línea si se envían datos
            peticion4.send(JSON.stringify(newComment));              // Hay que convertir el objeto a una cadena de texto JSON para enviarlo
            peticion4.addEventListener('load', ()=>{location.reload()})  //Comprueba que el formulario se ha enviado y luego ejecuta el cambio de pagina
            console.log("Formulario enviado")
        }
        else{
            alert("El comentario no puede estar vacio")
        }
    }
   
    