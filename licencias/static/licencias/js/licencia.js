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

$(document).ready(function () {
  let id_licencia = document.getElementById('id_licencia').value;

  qr = new QRious({
    element: document.getElementById('qr'),
    value: 'https://licenciavalidaapp-4xnk8.ondigitalocean.app/form/'+id_licencia+'/d948ded55ea1b2b3f0b6e17ef5de09f3af38e1a8/',
    size: 330,
    background: 'transparent'
  });
  qr = new QRious({ 
    element: document.getElementById('qr-vs'),
    value: 'https://licenciavalidaapp-4xnk8.ondigitalocean.app/form/'+id_licencia+'/d948ded55ea1b2b3f0b6e17ef5de09f3af38e1a8/',
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

});


