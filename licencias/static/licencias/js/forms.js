// Función para recopilar los datos de los formularios
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

function FromEN64toPNG(imagenEn64) {
        // Convierte la imagen en base64 a un Blob
        let partes = imagenEn64.split(';base64,');
        let contentType = partes[0].split(':')[1];
        let raw = window.atob(partes[1]);
        let rawLength = raw.length;
        let array = new Uint8Array(new ArrayBuffer(rawLength));
    
        for(let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
    
        let blob = new Blob([array], {type: contentType});
    
        // Crea un objeto File a partir del Blob
        let file = new File([blob], "nombre-de-la-imagen.png", {type: 'image/png'});
        return file;
    
}
function successAlert(title = "Licencia creada",id_licencia = undefined) {
    Swal.fire({
        title: title,
        icon: 'success',
        confirmButtonText: 'Ver licencia',
        customClass: {
            confirmButton: 'btn btn-soft-primary',
        },

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */ 
        if (result.isConfirmed) {
            
            window.location.href= '/licenciasview_watch_licencia/'+id_licencia+'/';
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
    }

    )
}



function recopilarDatos() {
    try {
        // Recopilamos los datos de los formularios
        let form_datos = document.getElementById('form_datos');
        let form_direc = document.getElementById('form_direc');
        let form_licencia = document.getElementById('form_licencia');
        let form_contacto = document.getElementById('form_contacto');




        // Recopilamos los archivos de las imágenes 
        let foto_file =  FromEN64toPNG(document.getElementById('foto-form-recorte').value);
        let firma_file = FromEN64toPNG(document.getElementById('firma-form-recorte').value);

        // Creamos un objeto FormData para empaquetar todos los datos
        let formData = new FormData();

        // Añadimos los datos de los formularios al objeto FormData
        for (let input of form_datos.elements) formData.append(input.id, input.value);
        for (let input of form_direc.elements) formData.append(input.id, input.value);
        for (let input of form_licencia.elements) formData.append(input.id, input.value);
        for (let input of form_contacto.elements) formData.append(input.id, input.value);

        // Añadimos los archivos de las imágenes al objeto FormData
        formData.append('foto_file', foto_file);
        formData.append('firma_file', firma_file);
        try {
            let id_licencia = document.getElementById('id_licencia').value;
            formData.append('id', id_licencia);
        } catch (error) {}
 
        // Retornamos el objeto FormData con todos los datos recopilados
        return formData;

    } catch (error) {
        return error;
    }


}

// Función para enviar los datos por medio de FETCH
function enviarDatos() {
    // Recopilamos los datos
    const csrfToken = getCSRFToken();

    let datos = recopilarDatos();
    if (datos instanceof FormData) {
        fetch('/licenciasfun_save_licencia', {
            method: 'POST',
            enctype: "multipart/form-data",
            headers: {
                'X-CSRFToken': csrfToken
    
            },
            body: datos,
        })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta de Django si es necesario
                successAlert('Licencia creada',data.id);
    
            })
            .catch(error => {
                errorAlert();
            });
    } else if (datos instanceof Error) {
        
        // Aquí va tu código para manejar el error
        errorAlert();

        console.log("error: "+datos.message)
    }
    

}

document.addEventListener("DOMContentLoaded", function () {
    try {
        // Obtenemos las instancias de Dropzone
        let dropzoneFoto = $("#myAwesomeDropzonefoto").get(0).dropzone;
        let dropzoneFirma = $("#myAwesomeDropzonefirma").get(0).dropzone;
    
        // Obtenemos las URLs de las imágenes
        let url_foto = document.getElementById("url_foto").value;
        let url_firma = document.getElementById("url_firma").value;
    
        // Creamos los objetos ficticios para representar las imágenes
        let archivo_ficticio_foto = { name: "foto.png", size: 12345, status: Dropzone.ADDED, url: url_foto };
        let archivo_ficticio_firma = { name: "firma.png", size: 12345, status: Dropzone.ADDED, url: url_firma };
    
        // Agregamos los objetos ficticios a las listas de archivos de Dropzone
        dropzoneFoto.files.push(archivo_ficticio_foto);
        dropzoneFirma.files.push(archivo_ficticio_firma);
    
        // Emitimos los eventos necesarios para agregar las imágenes a las instancias de Dropzone
        dropzoneFoto.emit("addedfile", archivo_ficticio_foto);
        dropzoneFoto.emit("thumbnail", archivo_ficticio_foto, url_foto);
        dropzoneFoto.emit("complete", archivo_ficticio_foto);
    
        dropzoneFirma.emit("addedfile", archivo_ficticio_firma);
        dropzoneFirma.emit("thumbnail", archivo_ficticio_firma, url_firma);
        dropzoneFirma.emit("complete", archivo_ficticio_firma);
    
    } catch (error) {
        
    }




})
try {
    document.getElementById('btn_uplicencia').addEventListener('click', function () {
        modal.show();
        const csrfToken = getCSRFToken();
    
        let datos = recopilarDatos();
    
        fetch('/licenciasfun_up_licencia', {
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
                successAlert("Licencia actualizada");
    
            })
            .catch(error => {
                modal.hide()
    
                errorAlert();
                modal.hide()
    
            });
    })
} catch (error) {
    
}
