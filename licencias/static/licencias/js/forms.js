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

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    let blob = new Blob([array], { type: contentType });

    // Crea un objeto File a partir del Blob
    let file = new File([blob], "nombre-de-la-imagen.png", { type: 'image/png' });
    return file;

}

function successAlert(title = "Licencia creada", id_licencia = undefined) {
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

            window.location.href = '/licenciasview_watch_licencia/' + id_licencia + '/';
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

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function recopilarDatos() {

        // Recopilamos los datos de los formularios
        let form_datos = document.getElementById('form_datos');
        let form_direc = document.getElementById('form_direc');
        let form_licencia = document.getElementById('form_licencia');
        let form_contacto = document.getElementById('form_contacto');
        var b64firma = document.getElementById('b64');
        var b64foto = document.getElementById('b64F');
        // Definimos las variables fuera de los bloques try/catch
        var foto_file;
        var firma_file;
                
        if (b64firma.value || b64foto.value) {
            console.log("ambas tineen b64");
            foto_file = FromEN64toPNG(b64foto.value);
            firma_file = FromEN64toPNG(b64firma.value);

        } else{
            try {
                // Recopilamos los archivos de las imágenes 
                foto_file = FromEN64toPNG(document.getElementById('foto-form-recorte').value);
                firma_file = FromEN64toPNG(document.getElementById('firma-form-recorte').value);
    
            } catch (error) {
    
                // Recopilamos los archivos de las imágenes 
                foto_file = getBase64Image(document.getElementById('foto_preview_editor'));
                firma_file = getBase64Image(document.getElementById('firma_preview_editor'));
    
            }
        }
        


        // Creamos  un objeto FormData para empaquetar todos los datos
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
        } catch (error) { }

        // Retornamos el objeto FormData con todos los datos recopilados
            // Verificar que se está enviando un archivo de imagen
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(key + ' es un archivo de tipo ' + value.type);
                if (!value.type.startsWith('image/')) {
                    console.log(key + ' no es un archivo de imagen');
                }
            }else{
                console.log("no");
                console.log(key, value.type, value);
            }
        }
        return formData;

    }


// Función para enviar los datos por medio de FETCH
function enviarDatos() {
    // Recopilamos los datos
    const csrfToken = getCSRFToken();

    var datos = recopilarDatos();
        // Verificar que se está enviando un archivo de imagen
    for (let [key, value] of datos.entries()) {
        if (value instanceof File) {
            console.log(key + ' es un archivo de tipo ' + value.type);
            if (!value.type.startsWith('image/')) {
                console.log(key + ' no es un archivo de imagen');
            }
        }else{
            console.log(key,value.type, value);
        }

    }
    
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
                successAlert('Licencia creada', data.id);

            })
            .catch(error => {
                errorAlert();
            });
    } else if (datos instanceof Error) {

        // Aquí va tu código para manejar el error
        errorAlert();

        console.log("error: " + datos.message)
    }


}


try {
    document.getElementById('btn_uplicencia').addEventListener('click', function () {
        modal.show();
        const csrfToken = getCSRFToken();

        let datos = recopilarDatos();
        var id_licencia = document.getElementById('id_licencia').value;
        console.log(datos);
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
                successAlert("Licencia actualizada", id_licencia);

            })
            .catch(error => {
                modal.hide()

                errorAlert();
                modal.hide()


            });
    })
} catch (error) {

}



document.addEventListener('DOMContentLoaded', function () {
    const inputImagen = document.getElementById('imagen_firma'); // input que carga la imagen
    const image = document.getElementById('firma_img_editor');
    const previewImage = document.getElementById('firma_preview_editor');
    const inputtododata = document.getElementById('b64');
    const aspectRatio = 0;
    const editbtn = document.getElementById('edit');
    let cropper;
    try {
        editbtn.addEventListener('click', function (e) {
            // Crear una nueva instancia de Cropper con la nueva imagen
            cropper = new Cropper(image, {
                aspectRatio: 205/245,
                viewMode: 3,
                dragMode: 'move',
                crop(event) {
                    updatePreview(cropper, previewImage);
                    inputtododata.value = "";
                },
                cropend(event) {
                    const croppedCanvas = cropper.getCroppedCanvas();
                    inputtododata.value = croppedCanvas.toDataURL("image/png");
                },
            });
        });
    } catch (error) {
        
    }


    inputImagen.addEventListener('change', function (e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (loadEvent) {
                const imagenDataURL = loadEvent.target.result;

                if (cropper) {
                    console.log('ya existe una instancia de Cropper');
                    cropper.destroy();
                }


                // Crear una nueva instancia de Cropper con la nueva imagen
                cropper = new Cropper(image, {
                    aspectRatio: 205/49,
                    viewMode: 0,
                    dragMode: 'move',
                    crop(event) {
                        updatePreview(cropper, previewImage);
                        inputtododata.value = "";
                    },
                    cropend(event) {
                        const croppedCanvas = cropper.getCroppedCanvas();
                        inputtododata.value = croppedCanvas.toDataURL("image/png");
                    },
                });

                // Establecer la imagen en el cropper
                cropper.replace(imagenDataURL);
            };

            reader.readAsDataURL(file);
        }
    });

    document.getElementById('rotate-left').addEventListener('click', function () {
        cropper.rotate(-45);  // Rotar 90 grados en sentido antihorario
    });

    document.getElementById('zoom-in').addEventListener('click', function () {
        cropper.zoom(0.1);  // Hacer zoom in 0.1 unidades
    });

    document.getElementById('zoom-out').addEventListener('click', function () {
        cropper.zoom(-0.1);  // Hacer zoom in 0.1 unidades
    });

    document.getElementById('rotate-right').addEventListener('click', function () {
        cropper.rotate(45);  // Rotar 90 grados en sentido antihorario
    });

    document.getElementById('restart').addEventListener('click', function () {
        cropper.reset(); //restart 
    });

    document.getElementById('crop').addEventListener('click', function () {

        document.getElementById('firma-form-recorte').value = inputtododata.value;
        cropper.crop();
        Swal.fire({
            title: 'Firma cargada',
            icon: 'success',
            confirmButtonText: 'Listo',
            customClass: {
                confirmButton: 'btn btn-soft-primary',
            },

        })
    });

    function updatePreview(cropperInstance, previewElement) {
        const croppedCanvas = cropperInstance.getCroppedCanvas();
        previewElement.src = croppedCanvas.toDataURL();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var image = document.getElementById('foto_img_editor');

    var inputImagen = document.getElementById('imagen_foto'); // input que carga la imagen
    var previewImage = document.getElementById('foto_preview_editor');
    var inputtododata = document.getElementById('b64F');
    var aspectRatio = 0; 
    let cropper;
    var edit_btn = document.getElementById('editF');
    // Función para crear o reemplazar la instancia de Cropper
    try {
        edit_btn.addEventListener('click', function (e) {
            // Crear una nueva instancia de Cropper con la nueva imagen
            cropper = new Cropper(image, {
                aspectRatio: 205/245, 
                viewMode: 0 ,
                dragMode: 'move',
                crop(event) {
                    updatePreview(cropper, previewImage);
                    inputtododata.value = "";
                },
                cropend(event) {
                    const croppedCanvas = cropper.getCroppedCanvas();
                    inputtododata.value = croppedCanvas.toDataURL("image/png");
                },
            });
        });
    } catch (error) {
        
    }


    inputImagen.addEventListener('change', function (e) {
        console.log('Cambio en el input de imagen');

        var file = e.target.files[0];
        var readerF = new FileReader();

        readerF.onload = function (loadEvent) {
            var imagenDataURL = loadEvent.target.result;

            if (cropper) {
                console.log('ya existe una instancia de Cropper');
                cropper.destroy();
            }

            // Crear una nueva instancia de Cropper con la nueva imagen
            cropper = new Cropper(image, {
                aspectRatio: 205/245,
                viewMode: 0,
                dragMode: 'move',
                crop(event) {
                    updatePreview(cropper, previewImage);
                    inputtododata.value = "";
                },
                cropend(event) {
                    var croppedCanvas = cropper.getCroppedCanvas();
                    inputtododata.value = croppedCanvas.toDataURL("image/png");
                },
            });

            // Establecer la imagen en el cropper
            cropper.replace(imagenDataURL, false);
        };

        readerF.readAsDataURL(file);
    });

    document.getElementById('rotate-leftF').addEventListener('click', function () {
        cropper.rotate(-45);  // Rotar 90 grados en sentido antihorario
    });

    document.getElementById('zoom-inF').addEventListener('click', function () {
        cropper.zoom(0.1);  // Hacer zoom in 0.1 unidades
    });

    document.getElementById('zoom-outF').addEventListener('click', function () {
        cropper.zoom(-0.1) ;  // Hacer zoom in 0.1 unidades
    });

    document.getElementById('rotate-rightF').addEventListener('click', function () {
        cropper.rotate(45);  // Rotar 90 grados en sentido antihorario
    });

    document.getElementById('restartF').addEventListener('click', function () {
        cropper.reset(); //restart 
    });

    document.getElementById('cropF').addEventListener('click', function () {

        document.getElementById('foto-form-recorte').value = inputtododata.value;
        cropper.crop();
        Swal.fire({
            title: 'Fotografia cargada',
            icon: 'success',
            confirmButtonText: 'Listo',
            customClass: {
                confirmButton: 'btn btn-soft-primary',
            },

        })



    });

    function updatePreview(cropperInstance, previewElement) {
        const croppedCanvas = cropperInstance.getCroppedCanvas();
        previewElement.src = croppedCanvas.toDataURL();
    }

});
