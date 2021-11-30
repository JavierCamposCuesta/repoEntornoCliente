let consulta = document.getElementById('consulta');
let select = document.getElementById("select");



consulta.addEventListener("click", ()=>{
    if(select.value == 0){

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(datos =>{
            datos.forEach(element => {
                let option = document.createElement('option');
                let valor = (element.id);
                let texto = element.name;
                option.value=valor;
                option.text=texto;
                select.appendChild(option);
                
            });
            
        })
        .catch(console.log("Error: " + response.error))
    }
});

select.addEventListener("click", (e)=>{
    if(e.target.tagName == "OPTION"){
        let id = e.target.value;

        fetch('https://jsonplaceholder.typicode.com/users?id='+id)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(datos =>{
            // let tabla = createElement("table");
            datos.forEach(element => {
                // console.log(Object.keys(element))
                for (let index = 0; index < Object.keys(element).length; index++) {
                    debugger
                    console.log(Object.keys(element)[index])
                    console.log(element.address.street)
                    
                }                
            });
            
        })
        .catch(console.log("Error: " + response.error))
    

        console.log(id);
    }
    else{
        console.log("no")
    }
})
