let form = document.getElementById("form");
let nombre = document.getElementById("nombre");
let nick = document.getElementById("nick");
let edad = document.getElementById("edad");
let email = document.getElementById("email");
let passw = document.getElementById("passw");

const formularioValido = {
    nombre: false,
    nick: false,
    edad: false,
    email: false,
    passw: false,
    terminos: false,
}

//Esta funcion validará todos aquellos campos que tienen como unica restriccion
//que no puedan estar vacios, de esta forma nos evitamos tener que repetir código
function validarObjetoNoVacio(o){
    let resultado = false;
    if (o.value.length > 0) {
        //Lo unico que hacemos es cambiar clases cuando el tamaño es mayor a 0
        o.classList.remove("invalido");
        o.classList.add("valido");
        resultado=true;
    }
    else{
        o.classList.remove("valido");
        o.classList.add("invalido");
    }
    return resultado;
   
}

//Validamos el campo nombre haciendo uso de la funcion anterior
nombre.addEventListener("change", validarNombre);

function validarNombre(){
    if (validarObjetoNoVacio(nombre)) {
        formularioValido.nombre= true;
    }
}

//Validamos los apellidos, igual que con el nombre
//Hay que modificarlo para que busque un nick que no esté repetido----------------------
nick.addEventListener("change", validarNick);

function validarNick(){
    if (validarObjetoNoVacio(nick)) {
        formularioValido.nick=true;
    }
}

//Esta funcion validará todos aquellos campos que tienen como unica restriccion
//que no puedan estar vacios, y sean numeros de esta forma nos evitamos tener que repetir código
function validarObjetoNumerico(o){
    let resultado = false;
    let regex = /^[0-9]+$/;
    if (o.value.length > 0 && regex.test(o.value)) {
        //Lo unico que hacemos es cambiar clases cuando el tamaño es mayor a 0
        o.classList.remove("invalido");
        o.classList.add("valido");
        resultado=true;
    }
    else{
        o.classList.remove("valido");
        o.classList.add("invalido");
    }
    return resultado;
   
}

//Validamos el campo edad haciendo uso de la funcion anterior
edad.addEventListener("change", validarEdad);

function validarEdad(){
    if (validarObjetoNumerico(edad)) {
        formularioValido.edad= true;
    }
}

//Creamos una funcion para validar el email
email.addEventListener("keypress", validarEmail);
email.addEventListener("change", validarEmail);

function validarEmail(){
    let regexEmail = /^.+@+.+\.+.{2,3}$/;
    
   
    let valorEmail = document.getElementById("email").value;

    if(regexEmail.test (valorEmail)==true){
        console.log("si entra");
        email.classList.remove("invalido");
        email.classList.add("valido");
        formularioValido.email=true;
    }
    else{
        email.classList.remove("valido");
        email.classList.add("invalido");
    }
}

//Validamos el campo de contraseña, solo vamos a exigir que no esté vacia
passw.addEventListener("change", validarPassw);

function validarPassw(){
    if (validarObjetoNoVacio(passw)) {
        formularioValido.passw= true;
    }
}

//Validamos que el campo terminos esté pulsado
terminos.addEventListener("change", validarTerminos);

function validarTerminos(){
    if(terminos.checked){
        formularioValido.terminos= true;
    }
    else{
        formularioValido.terminos= false;
    }
  }

  //Subimos el formulario si todo está correcto
  form.addEventListener("submit", (e)=>{e.preventDefault()
    validaTodas()});


    let boton = document.getElementById("boton");
    let formularioEnviado = "false";

    boton.addEventListener("change", validaTodas);

    function validaTodas(){
        const formValues = Object.values(formularioValido);
        const valid = formValues.findIndex(value => value == false);
        if(valid == -1) {
            const newProfile={
                name: nombre.value,
                nick: nick.value,
                age: edad.value,
                email: email.value,
                passw: passw.value
            }    
            const peticion=new XMLHttpRequest();
            peticion.open('POST', 'http://localhost:3000/profile');
            peticion.setRequestHeader('Content-type', 'application/json');  // Siempre tiene que estar esta línea si se envían datos
            peticion.send(JSON.stringify(newProfile));              // Hay que convertir el objeto a una cadena de texto JSON para enviarlo
            peticion.addEventListener('load', ()=>{location.href = 'posts.html'})  //Comprueba que el formulario se ha enviado y luego ejecuta el cambio de pagina
            console.log("Formulario enviado")

            
        }
        else {
            alert("Formulario inválido");
    }
}