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



fetch(urlFinal, {
}).then(response => response.json())
.then(data => {
//Cargamos cada dato en su etiqueta
titulo.innerHTML=data.title;
cuerpo.innerHTML=data.body;
autor.innerHTML=data.author;
fechaCreacion.innerHTML=data.date;
})
.catch(error => alert("Hay error al recuperar la información1"));



//Mostramos todos los comentarios asociados a este post
let tabla = document.getElementById("tabla");

let urlComentario="http://localhost:3000/comments?postId="+idParametro;

fetch(urlComentario, {
})
.then(response => 
// if(response.ok){
     response.json()

// return Promise.reject(response)
)


.then(data => {
    
    data.forEach(usuario => {
        tabla.insertRow(-1).innerHTML = '<tr' + '<td>' + usuario.body + '</td>' +
        '<td  class="tdAutor">' + usuario.nick + '</td></tr>';
        
    });
})
.catch(error => alert("Hay error al recuperar la información2"));
   
       
       
    
    
   


//Leemos para hacer la seleccion de todos los perfiles

fetch("http://localhost:3000/profile", {
}).then(response => {


    if(response.ok){
        return response.json()
    }
    return Promise.reject(response)
 } )
.then(data => {
            let listaComentadores = document.getElementById("listaComentadores");
            
            data.forEach(element => {
                let option = document.createElement('option');
                let valor = (element.postId);
                let texto = element.name;
                option.value=valor;
                option.text=texto;
                listaComentadores.appendChild(option);
                
            });
          
})
.catch(error => alert("Hay error al recuperar la información3"));

    
    
   
    
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
            fetch('http://localhost:3000/comments', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newComment)
            })
            .then(response => {


                if(response.ok){
                    return response.json()
                }
                return Promise.reject(response)
             } )
            .then(data => 
                location.reload()
            )
            .catch(error => alert("Hay error al recuperar la información"));
        }}
        