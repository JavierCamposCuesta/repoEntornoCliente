//Declaramos los inputs
let nombre = document.getElementById("nombre");
let apellidos = document.getElementById("apellidos");
let login = document.getElementById("login");
let pass = document.getElementById("pass");
let nacimiento = document.getElementById("nacimiento");
let edad = document.getElementById("edad");
let lista = document.getElementById("lista");

let sugerencias = document.getElementById("sugerencias");



const formularioValido = {
    nombre: false,
    apellidos: false,
    login: false,
    pass: false,
    nacimiento: false
}


function validarNombre(){
    fetch('https://intranetjacaranda.es/pruebaJS/arrayNombres.php?nombre='+ nombre.value)
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos =>{
        if(datos=="No hay sugerencias"){
            sugerencias.innerHTML=datos;
            sugerencias.classList.remove("oculto");
            formularioValido.nombre=true;
        }
        else{
            sugerencias.innerHTML=datos;
            sugerencias.classList.remove("oculto");
            formularioValido.nombre=true;
        }
        
    })
    .catch(console.log("Error: " + response.error));
}
nombre.addEventListener("change", validarNombre);


//Validacion apellidos
apellidos.addEventListener("change", validarApellidos);

function validarApellidos(){
    let regex = /[a-zA-Z]+\s[a-zA-Z]+$/;
    if(regex.test(apellidos.value)){
        formularioValido.apellidos=true;
        console.log("apellidos valido")
        
    }
    else{
        formularioValido.apellidos=false;
        console.log("apellidos no valido")
    }
}

//validacion login
login.addEventListener("change", validarLogin);

function validarLogin(){
    fetch('https://intranetjacaranda.es/pruebaJS/checkLogin.php', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: login.value
            })
            .then(response => {

                if(response.ok){
                    return response.text()
                }
                return Promise.reject(response)
             } )
            .then(data => {
                
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                let disponibleEtiqueta = xml.getElementsByTagName("disponible");
                let disponible = disponibleEtiqueta[0].textContent;
    
                if(disponible == "si"){
                    lista.innerHTML="Nombre dispobible";
                    lista.classList.remove("noDisponible");
                    lista.classList.add("disponible");
                    formularioValido.login=true;
                }
                else{
                    lista.innerHTML="Nombre no dispobible. Sugerencias:";
                    lista.classList.remove("disponible");
                    lista.classList.add("noDisponible");
                    formularioValido.login=false;

                    let alternativas = xml.getElementsByTagName('login');
                    for (let i = 1; i < alternativas.length; i++) {
                        let opcion = alternativas[i];
                        //Creamos los elementos necesarios 
                        let liOpcion = document.createElement('li');
                        let sugerencia = document.createElement("p");
                        sugerencia.textContent = opcion.textContent;

                        //Añadimos cada a al li
                        liOpcion.appendChild(sugerencia);
        
                        //Añadimos cada li a la lista
                        lista.appendChild(liOpcion);

                    }
                }
            }   
            )
            .catch(error => alert("Hay error al recuperar la información"));
}


//Validacion pass
pass.addEventListener("change", validarPass);

function validarPass() {
    //Para que la contraseña sea valida deberá tener como mínimo 1 caracter en mayusculas, 1 cararter en minúsculas, 1 número y como mínimo una longitud de 8 carácteres
    const regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
    if(regex.test(pass.value)){
        console.log('pass válida');
        formularioValido.pass=true;
    } 
    else{
        console.log('pass incorrecta')
        formularioValido.pass=false;
    } 
    }

    //Validar nacimiento
    nacimiento.addEventListener("change", validarNacimiento);

    function validarNacimiento(){
        let fechaActual = new Date();
        let fechaNacimiento = new Date(nacimiento.value);
        let edadTotal = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
        if(mes <0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())){
            edadTotal--;
        }
        if(edadTotal<18){
            formularioValido.nacimiento=false;
            alert("No puedes ser menor de edad");
        }
        else{
            formularioValido.nacimiento=true;
            edad.value=edadTotal;
        }
        
    }

    //Validamos el formulario
    function validadFormulario(){

        const formValues = Object.values(formularioValido);
        const valid = formValues.findIndex(value => value == false);
        if(valid == -1) {
            return true;
        }
        else {
            alert("Formulario inválido");
            
    }
    }


    //botones
let addUser = document.getElementById("addUser");
let deleteUser = document.getElementById("deleteUser");
let consultarUser = document.getElementById("consultarUser");
let ultimoUser = document.getElementById("ultimoUser");


//###########################################################################3Añadir usuario a Json


addUser.addEventListener("click", ()=>{
    if(validadFormulario()){
        let fechaAlta = new Date();
    const usuario={
        nombre: nombre.value,
        apellidos: apellidos.value,
        login: login.value,
        password: pass.value,
        edad: edad.value,
        fechaAlta: fechaAlta
}
const peticion=new XMLHttpRequest();
    peticion.open('POST', 'http://localhost:3000/usuarios');
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send(JSON.stringify(usuario));

    //Recargamos la pagina y quitamos la clase oculto para que se pueda ver el mensaje de enviado correctamente
    

    }
});


//Borrar datos
deleteUser.addEventListener("click", ()=>{
    localStorage.clear();
})

//Consultar Datos
    //Primeros obtenemos los valores de la tabla
    let tabla = document.getElementById("tabla");
    let nombreTabla = document.getElementById("nombreTabla");
    let apellidosTabla = document.getElementById("apellidosTabla");
    let loginTabla = document.getElementById("loginTabla");
    let passTabla = document.getElementById("passTabla");
    let edadTabla = document.getElementById("edadTabla");
    let fechaTabla = document.getElementById("fechaTabla");

//Consultar usuario
consultarUser.addEventListener("click", (e)=>{
    e.preventDefault();
    if(localStorage.getItem(login.value)){
        let usuario = JSON.parse(localStorage.getItem(login.value));
        nombreTabla.textContent = usuario.nombre;
        apellidosTabla.textContent = usuario.apellidos;
        loginTabla.textContent = usuario.login;
        passTabla.textContent = usuario.password;
        edadTabla.textContent = usuario.edad;
        fechaTabla.textContent = usuario.fechaAlta;


        tabla.classList.remove("oculto");

    }
    else{
        alert("No existe ese usuario")
        console.log("El usuario no existe");
    }
})

//Consultar ultimo usuario

ultimoUser.addEventListener("click", (e)=>{
    e.preventDefault();
    if(localStorage.length>0){
        let clave = localStorage.key(localStorage.length-1);
        let usuario = JSON.parse(localStorage.getItem(clave));
    
        nombreTabla.textContent = usuario.nombre;
            apellidosTabla.textContent = usuario.apellidos;
            loginTabla.textContent = usuario.login;
            passTabla.textContent = usuario.password;
            edadTabla.textContent = usuario.edad;
            fechaTabla.textContent = usuario.fechaAlta;
    
            tabla.classList.remove("oculto");
    }
    else{
        alert("No hay ningún usuario");
    }
    
    
})