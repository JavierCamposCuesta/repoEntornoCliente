// const CONTADOR =1;
let form = document.getElementById("form");
let tabla = document.getElementById("tabla");
let contenedorTareas = document.getElementById("contenedorTareas");
actualizarTareas();
let descripcion = document.getElementById("descripcion");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    addTarea();
});

function addTarea(){
    if(descripcion.value != ""){
        const tarea ={
            tarea: descripcion.value,
            terminada: false
        };
        localStorage.setItem(localStorage.length+1, JSON.stringify(tarea));
        actualizarTareas();
        console.log("si");

    }
    else{

        console.log("no");
    }
}



function actualizarTareas(){
    contenedorTareas.innerHTML=("");
    // Añadimos el boton eliminar
    Object.keys(localStorage).forEach(tarea => {
        //Para obtener cada tarea
        let tareaGeneral = JSON.parse(localStorage.getItem(tarea));
        
        let enlaceEliminar = document.createElement("a");
        enlaceEliminar.classList.add("enlaceEliminar");
        enlaceEliminar.innerHTML="&times;";
        enlaceEliminar.href="";
        enlaceEliminar.addEventListener("click", (e)=>{
            e.preventDefault();
            if(tareaGeneral.terminada==true){
                localStorage.removeItem(tarea);
                location.reload();
            }
            else{
                alert("Primero termina la tarea cohone")
            }
            
        });

    //Añadimos el inputCheckbox
        let inputCheckbox = document.createElement("input");
        inputCheckbox.type="checkbox";
        // inputCheckbox.value=tareaGeneral.terminada;
        inputCheckbox.addEventListener("click", (e)=>{
            if(inputCheckbox.checked){
                const tareaNueva ={
                    tarea: tareaGeneral.tarea,
                    terminada: true
                };
                
                localStorage.removeItem(tarea);
                localStorage.setItem(tarea, JSON.stringify(tareaNueva));
                tareaGeneral.terminada=true;
                inputCheckbox.checked = true;
            descripcion.classList.add("tachado");
                
            }
            else{
                const tareaNueva ={
                    tarea: tareaGeneral.tarea,
                    terminada: false
                };
                localStorage.removeItem(tarea);
                localStorage.setItem(tarea, JSON.stringify(tareaNueva));

                tareaGeneral.terminada=false;
                descripcion.classList.remove("tachado");
            }
        })

    //Añadimos la descripcion
        let descripcion = document.createElement("span");
        descripcion.textContent = tareaGeneral.tarea;

    //Añadimos le elemento a la lista
        let elemento = document.createElement("li");

        if(tareaGeneral.terminada==true){
            inputCheckbox.checked = true;
            descripcion.classList.add("tachado");
        }
        else{
            descripcion.classList.remove("tachado");
        }

        elemento.appendChild(inputCheckbox);
        elemento.appendChild(descripcion);
        elemento.appendChild(enlaceEliminar);
        contenedorTareas.appendChild(elemento);


    })
  


}


