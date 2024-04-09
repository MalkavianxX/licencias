// Función para recopilar los datos de los formularios
var modal = new bootstrap.Modal(document.getElementById('spinner_modal'), {});
var fotocropped = null;
var firmarecortada = null;

window.onload = function () { 

    'use strict';
    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download');
    var actions = document.getElementById('actions');



    var options = {
      aspectRatio: 205 / 245,
      preview: '.img-preview',
      ready: function (e) {
        console.log(fotocropped)
        console.log(e.type);
      },
      cropstart: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropmove: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropend: function (e) {
        console.log(e.type, e.detail.action);
      },
      crop: function (e) {
        var data = e.detail;


      },
      zoom: function (e) {
        console.log(e.type, e.detail.ratio);
      }
    };
    var cropper = new Cropper(image, options);
    var originalImageURL = image.src;
    var uploadedImageType = 'image/jpeg';
    var uploadedImageName = 'cropped.jpg';
    var uploadedImageURL;
    var btnGuardarFirmaRecortada = document.getElementById('guardarfirmarecortada');
    btnGuardarFirmaRecortada.style.display = 'none';

    var btnGuardarFotoRecortada = document.getElementById('guardarfotorecortada');
    btnGuardarFotoRecortada.style.display = 'none';



    document.getElementById('btnModoFirma').addEventListener('click', function () {
      cropper.enable();
      cropper.setAspectRatio(205 / 49);
      var previewElement = document.querySelector('.preview-lg');
      previewElement.style.width = '205px';
      previewElement.style.height = '49px';
      btnGuardarFotoRecortada.style.display = 'none';
      btnGuardarFirmaRecortada.style.display = 'block';
      cropper.enable();

    });
    document.getElementById('btnModoFoto').addEventListener('click', function () {
      cropper.enable();
      cropper.setAspectRatio(205 / 245);
      var previewElement = document.querySelector('.preview-lg');
      previewElement.style.width = '205px';
      previewElement.style.height = '245px';
      btnGuardarFotoRecortada.style.display = 'block';
      btnGuardarFirmaRecortada.style.display = 'none';
      cropper.enable();

    });

    btnGuardarFotoRecortada.addEventListener('click', function () {
      cropper.getCroppedCanvas().toBlob(function (blob) {
        // Guardar el Blob en la variable global
        fotocropped = blob;
        console.log(fotocropped);

        // Crear una URL de objeto del Blob
        var url = URL.createObjectURL(blob);

        // Establecer la URL de objeto como el atributo src del elemento img
        document.getElementById('foto_preview_editor').src = url;
      });

      cropper.reset();
      Swal.fire({
        title: 'Foto cargada',
        icon: 'success',
        confirmButtonText: 'De acuerdo',
        customClass: {
          confirmButton: 'btn btn-soft-primary',
        },

      })
      console.log(fotocropped)
    });


    btnGuardarFirmaRecortada.addEventListener('click', function () {
      cropper.getCroppedCanvas().toBlob(function (blob) {
        // Guardar el Blob en la variable global
        firmarecortada = blob;
        console.log(firmarecortada);

        // Crear una URL de objeto del Blob
        var url = URL.createObjectURL(blob);

        // Establecer la URL de objeto como el atributo src del elemento img
        document.getElementById('firma_preview_editor').src = url;
      });

      cropper.enable();
      Swal.fire({
        title: 'firma cargada',
        icon: 'success',
        confirmButtonText: 'De acuerdo',
        customClass: {
          confirmButton: 'btn btn-soft-primary',
        },

      })
      console.log(firmarecortada)
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Buttons
    if (!document.createElement('canvas').getContext) {
      $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
      $('button[data-method="rotate"]').prop('disabled', true);
      $('button[data-method="scale"]').prop('disabled', true);
    }

    // Download
    if (typeof download.download === 'undefined') {
      download.className += ' disabled';
      download.title = 'Your browser does not support download';
    }

    // Options
    actions.querySelector('.docs-toggles').onchange = function (event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var cropBoxData;
      var canvasData;
      var isCheckbox;
      var isRadio;

      if (!cropper) {
        return;
      }

      if (target.tagName.toLowerCase() === 'label') {
        target = target.querySelector('input');
      }

      isCheckbox = target.type === 'checkbox';
      isRadio = target.type === 'radio';

      if (isCheckbox || isRadio) {
        if (isCheckbox) {
          options[target.name] = target.checked;
          cropBoxData = cropper.getCropBoxData();
          canvasData = cropper.getCanvasData();

          options.ready = function () {
            console.log('ready');
            cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
          };
        } else {
          options[target.name] = target.value;
          options.ready = function () {
            console.log('ready');
          };
        }

        // Restart
        cropper.destroy();
        cropper = new Cropper(image, options);
      }
    };

    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var cropped;
      var result;
      var input;
      var data;

      if (!cropper) {
        return;
      }

      while (target !== this) {
        if (target.getAttribute('data-method')) {
          break;
        }

        target = target.parentNode;
      }

      if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
        return;
      }

      data = {
        method: target.getAttribute('data-method'),
        target: target.getAttribute('data-target'),
        option: target.getAttribute('data-option') || undefined,
        secondOption: target.getAttribute('data-second-option') || undefined
      };

      cropped = cropper.cropped;

      if (data.method) {
        if (typeof data.target !== 'undefined') {
          input = document.querySelector(data.target);

          if (!target.hasAttribute('data-option') && data.target && input) {
            try {
              data.option = JSON.parse(input.value);
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        switch (data.method) {
          case 'rotate':
            if (cropped && options.viewMode > 0) {
              cropper.clear();
            }

            break;

          case 'getCroppedCanvas':
            try {
              data.option = JSON.parse(data.option);
            } catch (e) {
              console.log(e.message);
            }

            if (uploadedImageType === 'image/jpeg') {
              if (!data.option) {
                data.option = {};
              }

              data.option.fillColor = '#fff';
            }

            break;
        }

        result = cropper[data.method](data.option, data.secondOption);

        switch (data.method) {
          case 'rotate':
            if (cropped && options.viewMode > 0) {
              cropper.crop();
            }

            break;

          case 'scaleX':
          case 'scaleY':
            target.setAttribute('data-option', -data.option);
            break;

          case 'getCroppedCanvas':
            if (result) {
              // Bootstrap's Modal
              $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

              if (!download.disabled) {
                download.download = uploadedImageName;
                download.href = result.toDataURL(uploadedImageType);
              }
            }

            break;

          case 'destroy':
            cropper = null;

            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
              uploadedImageURL = '';
              image.src = originalImageURL;
            }

            break;
        }

        if (typeof result === 'object' && result !== cropper && input) {
          try {
            input.value = JSON.stringify(result);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
    };

    document.body.onkeydown = function (event) {
      var e = event || window.event;

      if (e.target !== this || !cropper || this.scrollTop > 300) {
        return;
      }

      switch (e.keyCode) {
        case 37:
          e.preventDefault();
          cropper.move(-1, 0);
          break;

        case 38:
          e.preventDefault();
          cropper.move(0, -1);
          break;

        case 39:
          e.preventDefault();
          cropper.move(1, 0);
          break;

        case 40:
          e.preventDefault();
          cropper.move(0, 1);
          break;
      }
    };

    // Import image
    var inputImage = document.getElementById('inputImage');

    if (URL) {
      inputImage.onchange = function () {
        var files = this.files;
        var file;

        if (files && files.length) {
          file = files[0];

          if (/^image\/\w+/.test(file.type)) {
            uploadedImageType = file.type;
            uploadedImageName = file.name;

            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
            }

            image.src = uploadedImageURL = URL.createObjectURL(file);

            if (cropper) {
              cropper.destroy();
            }

            cropper = new Cropper(image, options);
            inputImage.value = null;
          } else {
            window.alert('Please choose an image file.');
          }
        }
      };
    } else {
      inputImage.disabled = true;
      inputImage.parentNode.className += ' disabled';
    }
  };

function getCSRFToken() {
    var name = 'csrftoken=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
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



function recopilarDatos() {

        // Recopilamos los datos de los formularios
        let form_datos = document.getElementById('form_datos');
        let form_direc = document.getElementById('form_direc');
        let form_licencia = document.getElementById('form_licencia');
        let form_contacto = document.getElementById('form_contacto');

                


        // Creamos  un objeto FormData para empaquetar todos los datos
        let formData = new FormData();

        // Añadimos los datos de los formularios al objeto FormData
        for (let input of form_datos.elements) formData.append(input.id, input.value);
        for (let input of form_direc.elements) formData.append(input.id, input.value);
        for (let input of form_licencia.elements) formData.append(input.id, input.value);
        for (let input of form_contacto.elements) formData.append(input.id, input.value);

        // Convertir los blobs a objetos File
        if (fotocropped !== null){
          var fotoFile = new File([fotocropped], "foto.png", {type: "image/png"});
          formData.append('foto_file', fotoFile);

        }
        if (firmarecortada !== null){
          var firmaFile = new File([firmarecortada], "firma.png", {type: "image/png"});
          formData.append('firma_file', firmaFile);
        }

        // Añadir los objetos File al FormData

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
    var csrfToken = getCSRFToken();

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
        var csrfToken = getCSRFToken();

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



