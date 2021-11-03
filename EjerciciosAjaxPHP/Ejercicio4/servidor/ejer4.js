let listaProvincias = document.getElementById('listaProvincias');
let listaMunicipios = document.getElementById('listaMunicipios');




    fetch('http://javiercamposcuesta.loc/Ejercicio4/servidor/cargaProvinciasXML.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos =>{
        const parser = new DOMParser();
        const xml = parser.parseFromString(datos, "application/xml");
        let provincia = xml.getElementsByTagName("provincia");
     
        for (let i = 0; i < provincia.length; i++) {
            //Recogemos cada opcion del php
           

            //Creamos los elementos necesarios 
            let option = document.createElement('option');
            let texto = (provincia[i].textContent);
            // let identificador = provincia[i];
            option.value=texto;
            option.text=texto;
            listaProvincias.appendChild(option);

            // No me da tiempo la segunda parte
            
            // option.addEventListener("click" (e=>{
            //     let option1 = document.createElement('option');
            //     for (let i = 0; i < provincia.length; i++) {
            //         if()
            //     let texto = (provincia[i].textContent);
            //     // let identificador = provincia[i];
            //     option.value=texto;
            //     option.text=texto;
            //     listaProvincias.appendChild(option);
            //     }
            // }))

           
            
        }
   
})
.catch(console.log("Error: " + response.error))


