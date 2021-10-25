let tabla = document.getElementById("tabla");

let peticion = new XMLHttpRequest();
peticion.open('GET', 'http://localhost:3000/posts');
peticion.send();
peticion.addEventListener('readystatechange', function () {

    if (peticion.readyState === 4) {
        if (peticion.status === 200) {




            let posts = JSON.parse(peticion.responseText); // Convertirmos los datos JSON a un objeto
            let enlace = "";
            posts.forEach(post => {



                enlace = "post.html?id=" + post.id;

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



                   


                })
            })

        }

        else {
            console.log("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
        }
    }
});




