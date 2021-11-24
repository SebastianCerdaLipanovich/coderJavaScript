/******************************************************
 *          CONSTANTES
 ******************************************************/

const URLGETUSERS = "https://jsonplaceholder.typicode.com/users";

/******************************************************
 *          FUNCIONES
 ******************************************************/
function callbackGetUsers(data, status) {
    if (status === "success") {
        for (const element of data) {
            //AGREGAMOS UNA ESTRUCTURA HTML POR PUBLICACION EN LA RESPUESTA.
            $("#usersList").append(`<div>
                                        <h2>${element.name}</h2>
                                        <p>${element.email}</p>
                                     </div></hr>`);
        }
    }
}


/******************************************************
 *          EVENTOS
 ******************************************************/

$(() => {
    $('body').fadeIn(1000);

    if ($("#getUsers").length>=1) {
        $("#getUsers").on("click", () => {
            location.href = "../Clase14/views/users.html";}
        )
    }else{
        $.get(URLGETUSERS, callbackGetUsers);
    }
})
