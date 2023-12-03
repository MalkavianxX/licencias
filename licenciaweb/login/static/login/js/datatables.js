
$(document).ready(function () {
    "use strict";
    var a = $("#datatable-buttons").DataTable({
        lengthChange: !1,
        buttons: ["copy", "print"],
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        },
    });

    a
        .buttons()
        .container()
        .appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)"),
        $("#alternative-page-datatable").DataTable({
            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>",
                }
            },
            pagingType: "full_numbers",
            drawCallback: function () {
                $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            rowCallback: function(row, data) {
                $(row).on('click', function () {
                    
                    $("#nameuser_edit").val(data[0]);  
                    $("#nombre_edit").val(data[1]); 
                    $("#apellido_edit").val(data[2]); 
                    $("#mailuser_edit").val(data[3]); 
                    $("#roluser_edit option").filter(function() {
                        return $(this).text() == data[4] ;
                    }).prop('selected', true);
                    $("#asignaciones_edit").val(data[5]); 
                    
                    $("#id_user_edit").val(row.id); 
                    // Abrir el modal

                    $("#modal-up-user").modal("show");
                });
            },
        }),
        $(".dataTables_length select").addClass("form-select form-select-sm"),
        $(".dataTables_length label").addClass("form-label");
});

var modal = new bootstrap.Modal(document.getElementById('spinner_modal'), {});

function getCSRFToken() {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}
function successAlert(title = "Licencia creada") {
    Swal.fire({
        title: title,
        icon: 'success',
        confirmButtonText: 'Listo',
        customClass: {
            confirmButton: 'btn btn-soft-primary',
        },

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */ 
        if (result.isConfirmed) { 
            window.location.reload();
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}
function errorAlert() {
    Swal.fire({
        title: 'Ha ocurrido un error',
        text: 'Verifica todos los campos',
        icon: 'error',
        confirmButtonText: 'Listo',
        customClass: {
            confirmButton: 'btn btn-soft-danger',
        },
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */ 
        if (result.isConfirmed) {
            modal.hide();

        } 
    })
}

function get_data_Users() { 
    try {

        // Crear un nuevo objeto FormData
        let formData = new FormData();

        // Agregar los datos del formulario al objeto FormData
        formData.append('nameuser', document.getElementById('nameuser').value);
        formData.append('mailuser', document.getElementById('mailuser').value);
        formData.append('asignaciones', document.getElementById('asignaciones').value);
        formData.append('roluser', document.getElementById('roluser').value);
        formData.append('passworduser', document.getElementById('passworduser').value);

        return formData;
    } catch (error) {
        return error;
    }

}

function get_data_User_Up() { 
    try {

        // Crear un nuevo objeto FormData
        let formData = new FormData();

        // Agregar los datos del formulario al objeto FormData
        formData.append('nameuser_edit', document.getElementById('nameuser_edit').value);
        formData.append('nombre_edit', document.getElementById('nombre_edit').value);
        formData.append('apellido_edit', document.getElementById('apellido_edit').value);
        formData.append('mailuser_edit', document.getElementById('mailuser_edit').value);
        formData.append('roluser_edit', document.getElementById('roluser_edit').value);
        formData.append('asignaciones_edit', document.getElementById('asignaciones_edit').value);
        formData.append('id_user_edit', document.getElementById('id_user_edit').value);
        formData.append('passworduser_edit', document.getElementById('passworduser_edit').value);
        return formData;
    } catch (error) {
        return error;
    }

}

document.getElementById("btn_user_add").addEventListener("click", function (event) {
    modal.show();


    const csrfToken = getCSRFToken();

    let datos = get_data_Users();

    if (datos instanceof FormData) {
        fetch('fun_addUser', {
            method: 'POST',
            enctype: "multipart/form-data",
            headers: {
                'X-CSRFToken': csrfToken
    
            },
            body: datos,
        })
            .then(response => response.json())
            .then(data => {
                modal.hide()

                // Manejar la respuesta de Django si es necesario
                successAlert(data.mensaje);
    
            })
            .catch(error => {
                errorAlert();
            });
    } else if (datos instanceof Error) {

        // Aquí va tu código para manejar el error
        errorAlert();

    }
    
});


document.getElementById("btn_user_up").addEventListener("click", function (event) {
    modal.show();


    const csrfToken = getCSRFToken();

    let datos = get_data_User_Up();

    if (datos instanceof FormData) {
        fetch('fun_UpUser', {
            method: 'POST',
            enctype: "multipart/form-data",
            headers: {
                'X-CSRFToken': csrfToken
    
            },
            body: datos,
        })
            .then(response => response.json())
            .then(data => {
                modal.hide()

                // Manejar la respuesta de Django si es necesario
                successAlert(data.mensaje);
    
            })
            .catch(error => {
                errorAlert();
            });
    } else if (datos instanceof Error) {

        // Aquí va tu código para manejar el error
        errorAlert();

    }
    
});


document.getElementById('btn_user_delete').addEventListener('click', function(event){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            const csrfToken = getCSRFToken();
            let datos = new FormData();
            datos.append('id_user_edit',document.getElementById('id_user_edit').value);
          // Aquí va el código para eliminar al usuario
          fetch('fun_delete_user', {
            method: 'POST',
            enctype: "multipart/form-data",
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: datos,
        })
            .then(response => response.json())
            .then(data => {})
            .catch(error => {});
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          )
          window.location.reload();
        }
      })
});