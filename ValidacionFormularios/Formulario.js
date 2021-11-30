let form = document.getElementById("form");
let nombre = document.getElementById("nombre");
let apellidos = document.getElementById("apellidos");
let edad = document.getElementById("edad");
let hijosSi = document.getElementById("hijosSi"); 
let hijosNo = document.getElementById("hijosNo"); 
let numeroHijos = document.getElementById("numeroHijos");
let dni = document.getElementById("dni");
let eCasado = document.getElementById("eCasado");
let eSoltero = document.getElementById("eSoltero");
let eDivorciado = document.getElementById("eDivorciado");
let eViudo = document.getElementById("eViudo");
let eNo = document.getElementById("eNo");
let email = document.getElementById("email");
let terminos = document.getElementById("terminos");
let yearCasado = document.getElementById("yearCasado");
let yearSoltero = document.getElementById("yearSoltero");
let yearDivorciado = document.getElementById("yearDivorciado");
let yearViudo = document.getElementById("yearViudo");



const formularioValido = {
    nombre: false,
    apellidos: false,
    edad: false,
    hijos: false,
    dni: false,
    email: false,
    terminos: false,
    year: false,
    estadoCivil: false
  
   
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
apellidos.addEventListener("change", validarApellidos);

function validarApellidos(){
    if (validarObjetoNoVacio(apellidos)) {
        formularioValido.apellidos=true;
    }
}

//--------------------------------------------------------------------------
//Validar campos numericos

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

//Validamos el numero de hijos
// numeroHijos.addEventListener("change", validarNumeroHijos);

// function validarNumeroHijos(){
//     if (validarObjetoNumerico(numeroHijos)) {
//         formularioValido.numeroHijos= true;
//     }
// }

//Validamos los años casados
yearCasado.addEventListener("change", validarYearCasado);

function validarYearCasado(){
    if (validarObjetoNumerico(yearCasado)) {
        formularioValido.year= true;
    }
}

//Validamos los años soltero
yearSoltero.addEventListener("change", validarYearSoltero);

function validarYearSoltero(){
    if (validarObjetoNumerico(yearSoltero)) {
        formularioValido.year= true;
    }
}

//Validamos los años divorciados
yearDivorciado.addEventListener("change", validarYearDivorciado);

function validarYearDivorciado(){
    if (validarObjetoNumerico(yearDivorciado)) {
        formularioValido.year= true;
    }
}

//Validamos los años viudo
yearViudo.addEventListener("change", validarYearViudo);

function validarYearViudo(){
    if (validarObjetoNumerico(yearViudo)) {
        formularioValido.year= true;
    }
}

//----------------------------------------------------------------------

//Deplegamos en el caso que tenga hijos
hijosSi.addEventListener("change", tieneHijos);

function tieneHijos(){
    document.getElementById("numeroHijosDiv").classList.remove("oculto");
    formularioValido.hijos=true;
}

//Ocultamos en el caso que no tenga hijos
hijosNo.addEventListener("change", noTieneHijos);

function noTieneHijos(){
    document.getElementById("numeroHijosDiv").classList.add("oculto");
    formularioValido.hijos=true;
}

//----------------------------------------------------------------------

//Realizamos la validacion del dni
dni.addEventListener("change", validarDni);

function validarDni(event) {

    let valorDni = document.getElementById("dni").value;

    
    var numero
    var letr
    var letra
    var expresion_regular_dni
   
    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
   
    if(expresion_regular_dni.test (valorDni) == true){
       numero = valorDni.substr(0,valorDni.length-1);
       letr = valorDni.substr(valorDni.length-1,1);
       numero = numero % 23;
       letra='TRWAGMYFPDXBNJZSQVHLCKET';
       letra=letra.substring(numero,numero+1);
      if (letra!=letr.toUpperCase()) {
        dni.classList.remove("valido");
        dni.classList.add("invalido");
         console.log('Dni erroneo, la letra del NIF no se corresponde');
       }else{
        dni.classList.remove("invalido");
        dni.classList.add("valido");
         console.log('Dni correcto');
         formularioValido.dni=true;
       }
    }else{
       console.log('Dni erroneo, formato no válido');
       dni.classList.remove("valido");
        dni.classList.add("invalido");
     }
  }

  //----------------------------------------------------------------------

  //creamos una funcion para ocultarlos todos
  function ocultarTodo(){
    document.getElementById("yearCasadoDiv").classList.add("oculto");
    document.getElementById("yearSolteroDiv").classList.add("oculto");
    document.getElementById("yearDivorciadoDiv").classList.add("oculto");
    document.getElementById("yearViudoDiv").classList.add("oculto");
  }
  //Desplegamos estado civil
  eCasado.addEventListener("change", () => {
      ocultarTodo();
    document.getElementById("yearCasadoDiv").classList.remove("oculto");
    formularioValido.estadoCivil=true;

  });

  eSoltero.addEventListener("change", ()=>{
    ocultarTodo();
    document.getElementById("yearSolteroDiv").classList.remove("oculto");
    formularioValido.estadoCivil=true;
  })

  eDivorciado.addEventListener("change", ()=>{
    ocultarTodo();
    document.getElementById("yearDivorciadoDiv").classList.remove("oculto");
    formularioValido.estadoCivil=true;
  })

  eViudo.addEventListener("change", ()=>{
    ocultarTodo();
    document.getElementById("yearViudoDiv").classList.remove("oculto");
    formularioValido.estadoCivil=true;
  })

  eNo.addEventListener("change", ()=>{
    ocultarTodo();
    formularioValido.estadoCivil=true;
  })

  //-------------------------------------------------------------------------------

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

  //-----------------------------------------------------------------------------
  terminos.addEventListener("change", validarTerminos);

  function validarTerminos(){
      if(terminos.checked){
          formularioValido.terminos= true;
      }
      else{
          formularioValido.terminos= false;
      }
    }

    //--------------------------------------------------------------------

    form.addEventListener("submit", (e)=>{e.preventDefault()
    validaTodas()});


    let boton = document.getElementById("boton");

    boton.addEventListener("change", validaTodas);

    function validaTodas(){
        const formValues = Object.values(formularioValido);
        const valid = formValues.findIndex(value => value == false);
        if(valid == -1) {
            form.submit();
            console.log("si");
        }
        else {
            alert("Formulario inválido");
            console.log("no");
    }
    }

  

 