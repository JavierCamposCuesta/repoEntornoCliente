let form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    e.preventDefault(); subirPost()});

let boton = document.getElementById("boton");
let titulo = document.getElementById("titulo");
let cuerpoPost = document.getElementById("cuerpoPost");
let listaUsuarios = document.getElementById("listaUsuarios");

//Leemos para hacer la seleccion de todos los perfiles

            
 
fetch('http://localhost:3000/profile', {
})
.then(response => {


    if(response.ok){
        return response.json()
    }
    return Promise.reject(response)
 } )
.then(data => {
    let listaUsuarios = document.getElementById("listaUsuarios");
   data.forEach(element => {

       let option = document.createElement('option');
       let valor = (element.postId);
       let texto = element.name;
       option.value=valor;
       option.text=texto;
       listaUsuarios.appendChild(option);
       
   })
    
    
    
    
})
.catch(error => alert("Hay error al recuperar la información4"));
   
    
            
    

//Creamos un evento para cuando cambie la seleccion de usuario
listaUsuarios.addEventListener("change", ()=>{indiceOption=listaUsuarios.selectedIndex;});

function subirPost(){
    //Evaluamos que el campo del titulo y el cuerpo no estén vacios
    if(titulo.value.length>0 && cuerpoPost.value.length>0){
        const fecha = new Date();
        const newPost={
            title: titulo.value,
            body: cuerpoPost.value,
            author: listaUsuarios.options[indiceOption].text,
            date: fecha.toLocaleDateString()
    }
    const peticion2=new XMLHttpRequest();
        peticion2.open('POST', 'http://localhost:3000/posts');
        peticion2.setRequestHeader('Content-type', 'application/json');  // Siempre tiene que estar esta línea si se envían datos
        peticion2.send(JSON.stringify(newPost));              // Hay que convertir el objeto a una cadena de texto JSON para enviarlo

        //Recargamos la pagina y quitamos la clase oculto para que se pueda ver el mensaje de enviado correctamente
        peticion2.addEventListener('load', ()=>{
            let mensajeEnviado=document.getElementById("mensajeEnviado");
            mensajeEnviado.classList.remove("oculto");

        })  //Comprueba que el formulario se ha enviado y luego ejecuta el cambio de pagina
            console.log("Formulario enviado")
}
else{
    alert("Los campos no pueden estar vacios");
    let mensajeEnviado=document.getElementById("mensajeEnviado");
            mensajeEnviado.classList.add("oculto");
}
}

