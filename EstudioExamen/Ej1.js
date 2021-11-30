let nickName = document.getElementById("nickName");
let nombre = document.getElementById("nombre");
let pass = document.getElementById("pass");
let dni = document.getElementById("dni");
let edad = document.getElementById("edad");
let form = document.getElementById("form");


const formularioValido = {
    nickName: false,
    dni: false,
    pass: false 
}

//Validamos pass
const validatePasswordModerate = (pass) => {
    //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
    const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
    if(passwordRegex.test(pass)){
        console.log('password vÃ¡lido');
        formularioValido.pass=true;
    } 
    else{
        console.log('password incorrecto')
        formularioValido.pass=false;
    } 
    }


//Validamos nickName
function validarNickName(nickName){
    //Esta funcion comprobará que el nick name no esté ya usado
    if(localStorage.getItem(nickName)){
        console.log("Nombre de usuario existente");
        formularioValido.nickName=false;
    }
    else{
        console.log("Nombre de usuario disponible");
        formularioValido.nickName=true;
    }
}


//Validamos dni
const validateDni = (dni) => {
    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET'
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
    const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
    const str = dni.toString().toUpperCase()
    if(!nifRexp.test(str) && !nieRexp.test(str)){
        console.log('DNI incorrecto');
        formularioValido.dni=false;
    }
    const nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2')
    const letter = str.substr(-1)
    const charIndex = parseInt(nie.substr(0, 8)) % 23
    if(validChars.charAt(charIndex) === letter){
        console.log('DNI válido');
        formularioValido.dni=true;
    }
    else{
        formularioValido.dni=false;
        console.log("dni invalido");
    }
    }


//Cancelamos la acción por defecto del formulario
form.addEventListener("submit", (e)=>{e.preventDefault()});

//Funcion para validar los campos
function validadFormulario(){
    validatePasswordModerate(pass.value);
    validarNickName(nickName.value);
    validateDni(dni.value);
    
    const formValues = Object.values(formularioValido);
    const valid = formValues.findIndex(value => value == false);
    if(valid == -1) {
        return true;
    }
    else {
        alert("Formulario inválido");
        
}
}


//Realizaremos las acciones de los botones
let addUser = document.getElementById("addUser");
let borrarDatos = document.getElementById("borrarDatos");
let consultarDatos = document.getElementById("consultarDatos");
let consultarUltimo = document.getElementById("consultarUltimo");

//Añadir usuario
addUser.addEventListener("click", ()=>{
    if(validadFormulario()){
        let fechaAlta = new Date();
        const usuario ={
            nombre: nombre.value,
            pass: pass.value,
            dni: dni.value,
            edad: edad.value,
            fechaAlta: fechaAlta
        };

        localStorage.setItem(nickName.value, JSON.stringify(usuario));
        location.reload();
    }
});

//Borrar datos
borrarDatos.addEventListener("click", ()=>{
    localStorage.clear();
})


//Obtenemos los datos de la tabla
let tabla = document.getElementById("tabla");
let nombreTabla = document.getElementById("nombreTabla");
let passTabla = document.getElementById("passTabla");
let dniTabla = document.getElementById("dniTabla");
let edadTabla = document.getElementById("edadTabla");
let fechaTabla = document.getElementById("fechaTabla");

//Consultar usuario
consultarDatos.addEventListener("click", ()=>{
    if(localStorage.getItem(nickName.value)){
        let usuario = JSON.parse(localStorage.getItem(nickName.value));
        nombreTabla.textContent = usuario.nombre;
        passTabla.textContent = usuario.pass;
        dniTabla.textContent = usuario.dni;
        edadTabla.textContent = usuario.edad;
        fechaTabla.textContent = usuario.fechaAlta;

        tabla.classList.remove("oculto");

    }
    else{
        alert("No existe ese usuario")
        console.log("El usuario no existe");
    }
})

