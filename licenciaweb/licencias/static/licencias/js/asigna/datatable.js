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
                // Llenar el modal con los datos de la fila
                $("#user").val(data[0]); // Usuario
                $("#cant_asignada").val(data[3]); // Cantidad asignada

                $("#id_asgn").val(row.id);
                // Abrir el modal
                $("#conf_asign").modal("show");
            });
        },
      }),
      $(".dataTables_length select").addClass("form-select form-select-sm"),
      $(".dataTables_length label").addClass("form-label");
  });
  
  

  