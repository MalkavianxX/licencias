var qr;

$(document).ready(function () {
  // Carga la imagen
  var fotoImg = new Image();
  var firmaImg = new Image();
  var idLicencia = document.getElementById('id_licencia').value;
  fotoImg.crossOrigin = "anonymous"; // Configura el atributo crossOrigin
  fotoImg.src = "/licenciasget_foto/" + idLicencia;  // Usa la URL de la vista

  firmaImg.crossOrigin = "anonymous"; // Configura el atributo crossOrigin
  firmaImg.src = "/licenciasget_firma/" + idLicencia;  // Usa la URL de la vista

  // Espera a que la imagen se cargue
  fotoImg.onload = function () {
    // Coloca la imagen en el elemento img con el id "foto"
    var fotoElement = document.getElementById("foto");
    var fotoSub = document.getElementById("foto-sub");

    fotoElement.src = fotoImg.src;
    fotoSub.src = fotoImg.src;

  };
  firmaImg.onload = function () {
    var firmaElement = document.getElementById("firma");
    firmaElement.src = firmaImg.src;


  }
});

window.onload = function () {
  let id_licencia = document.getElementById('id_licencia').value;

  qr = new QRious({
    element: document.getElementById('qr'),
    value: 'https://valida-maplu.ondigitalocean.app//get_licencia/' + id_licencia + '/STRMPVjgut87555mfptRULE.DDD-ART3LIC5RD',
    size: 330,
    background: 'transparent'
  });
  qr = new QRious({
    element: document.getElementById('qr-vs'),
    value: 'https://valida-maplu.ondigitalocean.app//get_licencia/' + id_licencia + '/STRMPVjgut87555mfptRULE.DDD-ART3LIC5RD',
    size: 330,
    background: 'transparent'
  });
  //licencias 
  var lic_anverso = document.getElementById('lic_anverso');
  var lic_reverso = document.getElementById('lic_reverso');
  //imagenes
  let img_anverso = parseInt(document.getElementById('img_anverso').value);
  let img_reverso = parseInt(document.getElementById('img_reverso').value);
  let autoriza = document.getElementById('autoriza');
  let f_autoriza = document.getElementById('f_autoriza');
  console.log(img_anverso, img_reverso);
  switch (img_anverso) {
    case 1:
      lic_anverso.classList.add('A-CHOFERA');
      autoriza.innerHTML = 'VEHÍCULO TRACTO CAMIÓN, VOLTEO, PIPA, TORTON, CAMIÓN DE 8 TONELADAS O MAYOR ASÍ COMO DE TRES EJES O MAS , CAMIÓN FORÁNEO PASAJERO.';
      f_autoriza.value = 'VEHÍCULO TRACTO CAMIÓN, VOLTEO, PIPA, TORTON, CAMIÓN DE 8 TONELADAS O MAYOR ASÍ COMO DE TRES EJES O MAS , CAMIÓN FORÁNEO PASAJERO.';

      break;
    case 2:
      lic_anverso.classList.add('A-AUTOMOVILISTA');
      autoriza.innerHTML = 'AUTOMOVILES PARTICULARES';
      f_autoriza.value = 'AUTOMOVILES PARTICULARES';
      break;
    case 3:
      lic_anverso.classList.add('B-choferB-anverso');
      autoriza.innerHTML = 'CAMION URBANO DE PASAJEROS Y CAMION DE CARGA A DOS TON DE DOS EJES';
      f_autoriza.value = 'CAMION URBANO DE PASAJEROS Y CAMION DE CARGA A DOS TON DE DOS EJES';
      break;
    case 4:
      lic_anverso.classList.add('C-CHOFERC');
      autoriza.innerHTML = 'VEHICULOS COMERCIALES CAMIONES TIPO PICK-UP. PANELES CERRADOS y CAMIONES RABONES DE HASTA DE 3 TON';
      f_autoriza.value = 'VEHICULOS COMERCIALES CAMIONES TIPO PICK-UP. PANELES CERRADOS y CAMIONES RABONES DE HASTA DE 3 TON';
      break;
    case 5:
      lic_anverso.classList.add('E-CHOFERD');
      autoriza.innerHTML = 'VEHICULOS DE ALQUILER (TAXIS)';
      f_autoriza.value = "VEHICULOS DE ALQUILER (TAXIS)";
      break;
    case 6:
      lic_anverso.classList.add('M-MOTOCICLISTA');
      autoriza.innerHTML = 'MOTOCICLETA';
      f_autoriza.value = "MOTOCICLETA";
      break;
    default:
      break;
  }
  switch (img_reverso) {
    case 1:
      lic_reverso.classList.add('reverso-si');
      break;
    case 2:
      lic_reverso.classList.add('reverso-no');
      break;
    default:
      break;
  }

}
document.getElementById('exportar-reverso').addEventListener('click', function (event) {
  event.preventDefault();
  var link = document.getElementById('exportar-reverso');
  if (link.getAttribute('href') === '') {

    exportarLicenciaReverso();
  } else {
    console.log('El atributo href contiene algo');

    // Crear un nuevo enlace
    var newLink = document.createElement('a');
    newLink.href = link.getAttribute('href');
    newLink.download = link.getAttribute('download');

    // Simular un clic en el nuevo enlace
    newLink.click();
  }
});





document.getElementById('exportar-anverso').addEventListener('click', function (event) {
  event.preventDefault();

  var link = document.getElementById('exportar-anverso');
  if (link.getAttribute('href') === '') {
    exportarAnverso();
  } else {
    // Crear un nuevo enlace
    var newLink = document.createElement('a');
    newLink.href = link.getAttribute('href');
    newLink.download = link.getAttribute('download');

    // Simular un clic en el nuevo enlace
    newLink.click();
  }
});

document.getElementById('exportarpdf').addEventListener('click', function (event) {
  event.preventDefault();

  var link = document.getElementById('exportarpdf');
  if (link.getAttribute('href') === '') {
    const idLicencia = document.getElementById('id_licencia').value
    var formData = new FormData();
    formData.append('idLicencia', idLicencia);
    fetchPDF(formData);
  } else {
    // Crear un nuevo enlace
    var newLink = document.createElement('a');
    newLink.href = link.getAttribute('href');
    newLink.download = link.getAttribute('download');

    // Simular un clic en el nuevo enlace
    newLink.click();
  }

});

function exportarAnverso() {
  link_original = document.getElementById('exportar-anverso');
  // Iniciar SweetAlert2
  Swal.fire({
    title: 'Exportando anverso...',
    html: 'Por favor espera',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    }
  });




  html2canvas(document.querySelector("#lic_anverso")).then(canvas => {
    let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;
    let link = document.createElement('a');
    link.download = 'ANVERSO -' + nombre;
    // Crear un nuevo canvas para rotar la imagen
    var canvasRotado = document.createElement('canvas');
    var ctxRotado = canvasRotado.getContext('2d');

    // Establecer las dimensiones del nuevo canvas
    canvasRotado.width = canvas.height;
    canvasRotado.height = canvas.width;

    // Trasladar el punto de origen al centro del canvas
    ctxRotado.translate(canvas.height / 2, canvas.width / 2);

    // Rotar la imagen 90 grados (pi/2 radianes)
    ctxRotado.rotate(-Math.PI / 2);

    // Dibujar la imagen en el canvas, ajustando las coordenadas para que el centro de la imagen coincida con el punto de origen
    ctxRotado.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    // Descargar la imagen rotada
    link.href = canvasRotado.toDataURL('image/jpeg', 0.8)
    const imageData = canvasRotado.toDataURL('image/jpeg', 0.8);
    const idLicencia = document.getElementById('id_licencia').value

    var formData = new FormData();
    formData.append('idLicencia', idLicencia);
    formData.append('imagen', imageData);

    // Enviar la imagen al servidor
    return fetch('/licenciasguardar_anverso', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        link_original.href = canvasRotado.toDataURL('image/jpeg', 0.8)
        link.click();
        console.log('Anverso exitoso');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error al guardar la imagen:', error);
      });
  }).finally(() => {
    setTimeout(function () {
      Swal.close();

    }, 500); // Retrasa el cierre del modal 1 segundo
  });
}

function exportarLicenciaReverso() {
  // Iniciar SweetAlert2
  link_original = document.getElementById('exportar-reverso');

  Swal.fire({
    title: 'Exportando imagen...',
    html: 'Por favor espera',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    }
  });




  html2canvas(document.querySelector("#lic_reverso")).then(canvas => {
    let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;
    let link = document.createElement('a');
    link.download = 'REVERSO -' + nombre;
    var canvasRotado = document.createElement('canvas');
    var ctxRotado = canvasRotado.getContext('2d');

    canvasRotado.width = canvas.height;
    canvasRotado.height = canvas.width;

    ctxRotado.translate(canvas.height / 2, canvas.width / 2);
    ctxRotado.rotate(-Math.PI / 2);
    ctxRotado.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    link.href = canvasRotado.toDataURL('image/jpeg', 0.8);
    const imageData = canvasRotado.toDataURL('image/jpeg', 0.8);
    const idLicencia = document.getElementById('id_licencia').value

    var formData = new FormData();
    formData.append('idLicencia', idLicencia);
    formData.append('imagen', imageData);

    return fetch('/licenciasguardar_reverso', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        link_original.href = canvasRotado.toDataURL('image/jpeg', 0.8);
        link.click();
        console.log('Revero exitoso');
        window.location.reload();
      })
      .catch(error => {

        console.error('Error al guardar la imagen:', error);
      });
  }).finally(() => {
    setTimeout(function () {

      Swal.close();
    }, 500);
  });
}



async function fetchPDF(formData) {
  try {
    Swal.fire({
      title: 'Creando PDF...',
      html: 'Por favor espera',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const response = await fetch('/licenciastoPDF', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    console.log("ok");
    document.getElementById('exportarpdf').href = data.pdf_url;
    Swal.update({
      title: 'PDF exportado con éxito',
    });
    Swal.close();
    window.location.reload();
  } catch (error) {
    if (error.message == "410") {
      Swal.update({
        title: 'No se encontró anverso...',
        html: 'Creando anverso'

      });
      await expoAnversoLicFun();
      fetchPDF(formData);
    } else if (error.message == "411") {
      Swal.update({
        title: 'No se encontró reverso...',
        html: 'Creando reverso',

      });
      await expoLicReversoFun();
      fetchPDF(formData);
    } else {
      console.error('Error al guardar pdf:', error);
    }
  }
}

//********************************************************************** */
function expoLicReversoFun() {
  return new Promise((resolve, reject) => {

    let link = document.getElementById('exportar-reverso');

    html2canvas(document.querySelector("#lic_reverso")).then(canvas => {
      var canvasRotado = document.createElement('canvas');
      var ctxRotado = canvasRotado.getContext('2d');

      canvasRotado.width = canvas.height;
      canvasRotado.height = canvas.width;

      ctxRotado.translate(canvas.height / 2, canvas.width / 2);
      ctxRotado.rotate(-Math.PI / 2);
      ctxRotado.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

      link.href = canvasRotado.toDataURL('image/jpeg', 0.8);
      const imageData = canvasRotado.toDataURL('image/jpeg', 0.8);
      const idLicencia = document.getElementById('id_licencia').value

      var formData = new FormData();
      formData.append('idLicencia', idLicencia);
      formData.append('imagen', imageData);

      fetch('/licenciasguardar_reverso', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Reverso creado: ' + data);
          resolve();

        })
        .catch(error => {
          console.error('Error al guardar la imagen:', error);
          reject(error);

        });
    });
  });
}

function expoAnversoLicFun() {

  return new Promise((resolve, reject) => {

    let link = document.getElementById('exportar-anverso'); 

    html2canvas(document.querySelector("#lic_anverso")).then(canvas => {
      var canvasRotado = document.createElement('canvas');
      var ctxRotado = canvasRotado.getContext('2d');

      canvasRotado.width = canvas.height;
      canvasRotado.height = canvas.width;

      ctxRotado.translate(canvas.height / 2, canvas.width / 2);
      ctxRotado.rotate(-Math.PI / 2);
      ctxRotado.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

      link.href = canvasRotado.toDataURL('image/jpeg', 0.8);
      const imageData = canvasRotado.toDataURL('image/jpeg', 0.8);
      const idLicencia = document.getElementById('id_licencia').value

      var formData = new FormData();
      formData.append('idLicencia', idLicencia);
      formData.append('imagen', imageData);

      fetch('/licenciasguardar_anverso', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {

          console.log('Anverso creado: ' + data);
          resolve();
        })
        .catch(error => {

          console.error('Error al guardar la imagen:', error);
          reject(error);
        });
    });
  });
}
