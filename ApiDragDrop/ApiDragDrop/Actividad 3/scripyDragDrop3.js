const pendingTasks = document.getElementById('pending-tasks')
const finishedTasks = document.getElementById('finished-tasks')
const doingTasks = document.getElementById('doing-tasks')
let container = document.getElementById("container");

//dataTransfer
//setData: Establece la información que queremos compartir
//getData: Establece la información que queremos obtener

pendingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

pendingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

pendingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

doingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

doingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

doingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

//Tenemos que crear los eventos para la salida del ultimo bloque -----------
finishedTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

finishedTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

finishedTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})


//OBLIGATORIO, SI NO, NO FUNCIONA
finishedTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

finishedTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id
    
    //Tenemos que actualizar la columna del elemento en el localStorage
    let objeto = JSON.parse(localStorage.getItem(element.id));
    objeto.columna="finished-tasks";
    localStorage.setItem(element.id, JSON.stringify(objeto));
    switch (padre) {
        case 'pending-tasks':
          console.log('pendingTasks');
          finishedTasks.appendChild(pendingTasks.removeChild(element));


          break;
        case 'doing-tasks':
          console.log('doingTasks');
          finishedTasks.appendChild(doingTasks.removeChild(element));
          break;
      }
    })

doingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

doingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id
    
    
    //Tenemos que actualizar la columna del elemento en el localStorage
    let objeto = JSON.parse(localStorage.getItem(element.id));
    objeto.columna="doing-tasks";
    localStorage.setItem(element.id, JSON.stringify(objeto));

    switch (padre) {
        case 'pending-tasks':
          console.log('pendingTasks');
          doingTasks.appendChild(pendingTasks.removeChild(element));
          break;
        case 'finished-tasks':
          console.log('doingTasks');
          doingTasks.appendChild(finishedTasks.removeChild(element));
          break;
      }
})

pendingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

pendingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id
    


    //Tenemos que actualizar la columna del elemento en el localStorage
    let objeto = JSON.parse(localStorage.getItem(element.id));
    objeto.columna="pending-tasks";
    localStorage.setItem(element.id, JSON.stringify(objeto));

    

    switch (padre) {
        case 'doing-tasks':
          console.log('pendingTasks');
          pendingTasks.appendChild(doingTasks.removeChild(element));

          //Vamos a borrar el localStorage antiguo y insertar uno nuevo
          
          localStorage.setItem(localStorage.length+1, JSON.stringify(tarea));

          break;
        case 'finished-tasks':
          console.log('doingTasks');
          pendingTasks.appendChild(finishedTasks.removeChild(element));
          break;
      }
})


//Vamos a añadir nosotros las tareas -------------

let descripcion = document.getElementById("descripcion");
let form = document.getElementById("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    addTarea();
    
});

function actualizarTareas(){

    Object.keys(localStorage).forEach(tarea => {
        let tareaGeneral = JSON.parse(localStorage.getItem(tarea));

    if(tareaGeneral.columna=="pending-tasks"){
        let nuevaTarea = document.createElement("div");
        nuevaTarea.classList.add("task");
        nuevaTarea.setAttribute("id", tarea);
        console.log(tarea);
        nuevaTarea.setAttribute("draggable", "true");
        nuevaTarea.innerHTML=tareaGeneral.tarea;

        document.getElementById("pending-tasks").appendChild(nuevaTarea);
    }
    else if(tareaGeneral.columna=="doing-tasks"){
        let nuevaTarea = document.createElement("div");
        nuevaTarea.classList.add("task");
        nuevaTarea.setAttribute("id", tarea);
        nuevaTarea.setAttribute("draggable", "true");
        nuevaTarea.innerHTML=tareaGeneral.tarea;

        document.getElementById("doing-tasks").appendChild(nuevaTarea);
    }
    else{
        let nuevaTarea = document.createElement("div");
        nuevaTarea.classList.add("task");
        nuevaTarea.setAttribute("id", tarea);
        nuevaTarea.setAttribute("draggable", "true");
        nuevaTarea.innerHTML=tareaGeneral.tarea;

        document.getElementById("finished-tasks").appendChild(nuevaTarea);
    }
    })
}

function addTarea(){
    if(descripcion.value != ""){
        const tarea ={
            tarea: descripcion.value,
            columna: "pending-tasks",
        };
        localStorage.setItem(localStorage.length+1, JSON.stringify(tarea));
        location.reload();

    }
    else{

        console.log("no");
    }
}
//Lo primero que tenemos que hacer es llamar al metodo actualizar, para que recargue en condiciones
actualizarTareas();


//Hacemos un boton para borrar
let resetear = document.getElementById("reset");
resetear.addEventListener("click", ()=>{localStorage.clear()
location.reload()})

