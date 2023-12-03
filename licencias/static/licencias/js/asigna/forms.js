var modal = new bootstrap.Modal(document.getElementById('spinner_modal'), {});
var modalEdit = new bootstrap.Modal(document.getElementById('conf_asign'), {});

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

function errorAlert(text = "Verifica todos los campos") {
    Swal.fire({
        title: 'Ha ocurrido un error',
        text: text,
        icon: 'error',
        confirmButtonText: 'Listo',
        customClass: {
            confirmButton: 'btn btn-soft-primary',
        },
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.reload();
        } 
    })
}
// Función para enviar los datos por medio de FETCH
document.getElementById('btn_up_asgn').addEventListener('click', function () {
    modalEdit.hide();
    modal.show();

    const csrfToken = getCSRFToken();
    let formData = new FormData();
    formData.append('cant_asignada', document.getElementById('cant_asignada').value);
    formData.append('id_asgn', document.getElementById('id_asgn').value);




    fetch('/licenciasfun_Up_asignaciones', {
        method: 'POST',
        enctype: "multipart/form-data",
        headers: {
            'X-CSRFToken': csrfToken

        },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            modal.hide()
            console.log(data);
            if (data.error) {
                errorAlert(data.error);
            } else{
                // Manejar la respuesta de Django si es necesario
                successAlert("Asignacion actualizada");
                modal.hide()

            }


        })
        .catch(error => {
            console.log(error);
            modal.hide()

            errorAlert();
        });
})
