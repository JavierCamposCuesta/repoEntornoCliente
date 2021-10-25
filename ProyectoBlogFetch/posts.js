let tabla = document.getElementById("tabla");

    fetch('http://localhost:3000/posts', {
    }).then(response => response.json()).then(data => {
            data.forEach(post => {

                let enlace = "post.html?id=" + post.id;

                tabla.insertRow(-1).innerHTML = '<tr><td>' + post.title + '</td>' +
                    '<td>' + post.author + '</td>' +
                    '<td>' + '<a href="' + enlace + '" class="enlace">Ver</a>'+
                      '<a id="' + post.id + '" href="l" class="enlace">Borrar</a></td></tr>'
                    ;

                let enlaceBorrado = document.getElementById(post.id); 
                //console.log(enlaceBorrado(enlaceBorrado));
                enlaceBorrado.addEventListener("click", (e) => {
                    e.preventDefault();
                    let peticion2 = new XMLHttpRequest();

                    peticion2.open('DELETE', 'http://localhost:3000/posts/' + post.id);
                    peticion2.send();
                    peticion2.addEventListener('load', ()=>{location.reload()})  //Comprueba que el formulario se ha enviado y luego ejecuta el cambio de pagina
                })})

    }).catch(error => alert("Hay error al recuperar la información"))
        
    
;




