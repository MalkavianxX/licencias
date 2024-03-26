var qr;
window.onload = function() {
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
  let img_anverso = parseInt( document.getElementById('img_anverso').value);
  let img_reverso = parseInt( document.getElementById('img_reverso').value);
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
          autoriza.innerHTML  = 'VEHICULOS COMERCIALES CAMIONES TIPO PICK-UP. PANELES CERRADOS y CAMIONES RABONES DE HASTA DE 3 TON';
          f_autoriza.value = 'VEHICULOS COMERCIALES CAMIONES TIPO PICK-UP. PANELES CERRADOS y CAMIONES RABONES DE HASTA DE 3 TON';
          break;   
      case 5:
          lic_anverso.classList.add('E-CHOFERD');
          autoriza.innerHTML = 'VEHICULOS DE ALQUILER (TAXIS)';
          f_autoriza.value = "VEHICULOS DE ALQUILER (TAXIS)";
          break;   
      case 6:
          lic_anverso.classList.add('M-MOTOCICLISTA');
          autoriza.innerHTML= 'MOTOCICLETA';
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
document.getElementById('exportar-reverso').addEventListener('click', function() {
  let  mydiv = document.getElementById('lic_reverso');
  mydiv.style.display = "block";
  html2canvas(document.querySelector("#lic_reverso")).then(canvas => {
    modal.show();

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
      let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;
      let link = document.createElement('a');
      link.download =  nombre;
      link.download = 'REVERSO -' + link.download
      link.href = canvasRotado.toDataURL()
      link.click();
      setTimeout(function() {
        modal.hide();
        mydiv.style.display ="none";
    }, 500); // Retrasa el cierre del modal 1 segundo
  }); 
});


var modal = new bootstrap.Modal(document.getElementById('spinner_modal'), {});


document.getElementById('exportar-anverso').addEventListener('click', function() {
    let  mydiv = document.getElementById('lic_anverso');
    mydiv.style.display = "block";
    html2canvas(document.querySelector("#lic_anverso")).then(canvas => {
        modal.show();
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
        let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;
        let link = document.createElement('a');
        link.download =  nombre;
        link.download = 'ANVERSO -' + link.download
        link.href = canvasRotado.toDataURL()
        link.click();
        setTimeout(function() {
            modal.hide();
            mydiv.style.display ="none";
        }, 500); // Retrasa el cierre del modal 1 segundo

    });

  });

document.getElementById('exportarpdf').addEventListener('click', function() {
    modal.show();
    let  mydiv = document.getElementById('lic_anverso');
    let  mydiv2 = document.getElementById('lic_reverso');
    mydiv.style.display = "block";
    mydiv2.style.display = "block";

  html2canvas(document.querySelector("#lic_anverso")).then(canvas1 => {


      var pdf = new jsPDF('p', 'pt', 'a4');
      var width = pdf.internal.pageSize.width;
      var height = pdf.internal.pageSize.height;
      pdf.addImage(canvas1.toDataURL("image/png"), 'PNG', 0, 0, width, height);
      pdf.addPage();
      html2canvas(document.querySelector("#lic_reverso")).then(canvas2 => {
          pdf.addImage(canvas2.toDataURL("image/png"), 'PNG', 0, 0, width, height);
          let nombre = document.getElementById('f_nombre').value + ' ' + document.getElementById('f_apellidos').value;

          pdf.save(nombre);
      });
      setTimeout(function() {
        modal.hide();
        mydiv.style.display ="none";
        mydiv2.style.display ="none";

    }, 500); // Retrasa el cierre del modal 1 segundo
  });
});
