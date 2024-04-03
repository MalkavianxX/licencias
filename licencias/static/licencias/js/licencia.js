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
    value: 'https://licencias-bajacalifornia-gob.com/get_licencia/' + id_licencia + '/STRMPVjgut87555mfptRULE.DDD-ART3LIC5RD',
    size: 330,
    background: 'transparent'
  });
  qr = new QRious({
    element: document.getElementById('qr-vs'),
    value: 'https://licencias-bajacalifornia-gob.com/get_licencia/' + id_licencia + '/STRMPVjgut87555mfptRULE.DDD-ART3LIC5RD',
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
document.getElementById('exportar-reverso').addEventListener('click', function () {
  var link = document.getElementById('exportar-reverso');
  if (link.getAttribute('href') === '') {
    exportarLicenciaReverso(link);
  } else {
    console.log('El atributo href contiene algo');
    link.click();

  }
});




document.getElementById('exportar-anverso').addEventListener('click', function () {
  var link = document.getElementById('exportar-anverso');
  if (link.getAttribute('href') === '') {
    exportarAnverso();
  } else {
    link.click();
  }
});

document.getElementById('exportarpdf').addEventListener('click', function () {
  // Iniciar SweetAlert2
  Swal.fire({
    title: 'Exportando a PDF...',
    html: 'Por favor espera',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    }
  });
  let mydiv = document.getElementById('lic_anverso');
  let mydiv2 = document.getElementById('lic_reverso');
  mydiv.style.display = "block";
  mydiv2.style.display = "block";
  let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;

  // Iniciar SweetAlert2
  Swal.fire({
    title: 'Exportando a PDF...',
    html: 'Por favor espera',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    }
  });

  var pdf = new jsPDF('p', 'pt', 'a4');
  var width = pdf.internal.pageSize.width;
  var height = pdf.internal.pageSize.height;

  html2canvas(document.querySelector("#lic_anverso"), { willReadFrequently: true }).then(canvas1 => {
    pdf.addImage(canvas1.toDataURL("image/png"), 'PNG', 0, 0, width, height);
    pdf.addPage();

    html2canvas(document.querySelector("#lic_reverso"), { willReadFrequently: true }).then(canvas2 => {
      pdf.addImage(canvas2.toDataURL("image/png"), 'PNG', 0, 0, width, height);
      pdf.save(nombre);
    }).finally(() => {
      setTimeout(function () {
        Swal.close();
        mydiv.style.display = "none";
        mydiv2.style.display = "none";
      }, 500); // Retrasa el cierre del modal 1 segundo
    });
  });
});


function exportarAnverso() {
  let mydiv = document.getElementById('lic_anverso');
  mydiv.style.display = "block";
  let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;
  let link = document.createElement('a');
  link.download = 'ANVERSO -' + nombre;

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
    link.href = canvasRotado.toDataURL()
    const imageData = canvasRotado.toDataURL();
    const idLicencia = document.getElementById('id_licencia').value

    var formData = new FormData();
    formData.append('idLicencia', idLicencia);
    formData.append('imagen', imageData);

    // Enviar la imagen al servidor
    fetch('/licenciasguardar_anverso', {
      method: 'POST',
      body: formData,

    })
      .then(response => response.json())
      .then(data => {
        link.click();
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
  let mydiv = document.getElementById('lic_reverso');
  mydiv.style.display = "block";
  let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;
  let link = document.createElement('a');
  link.download = 'REVERSO -' + nombre;

  // Iniciar SweetAlert2
  Swal.fire({
    title: 'Exportando imagen...',
    html: 'Por favor espera',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  html2canvas(document.querySelector("#lic_reverso")).then(canvas => {
    var canvasRotado = document.createElement('canvas');
    var ctxRotado = canvasRotado.getContext('2d');

    canvasRotado.width = canvas.height;
    canvasRotado.height = canvas.width;

    ctxRotado.translate(canvas.height / 2, canvas.width / 2);
    ctxRotado.rotate(-Math.PI / 2);
    ctxRotado.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    link.href = canvasRotado.toDataURL();
    const imageData = canvasRotado.toDataURL();
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
      link.click();
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

