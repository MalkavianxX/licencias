def recovery_save(request):
    # Obtener el cuerpo del JSON
    # Crear un diccionario para almacenar los datos
    data = {}

    # Obtener los datos del formulario
    data['datos_nombres'] = request.POST.get('datos_nombres')
    data['datos_apellidos'] = request.POST.get('datos_apellidos')
    data['datos_curp'] = request.POST.get('datos_curp')
    data['datos_sangre'] = request.POST.get('datos_sangre')
    data['datos_sexo'] = request.POST.get('datos_sexo')
    data['datos_nacionalidad'] = request.POST.get('datos_nacionalidad')
    data['datos_restriacciones'] = request.POST.get('datos_restriacciones')
    data['datos_nacimiento'] = request.POST.get('datos_nacimiento')
    data['datos_rfc'] = request.POST.get('datos_rfc')
    if request.POST.get('datos_donante') == 'N':

        data['datos_donante'] = False
    else: 
        data['datos_donante'] = True


    data['direc_calle'] = request.POST.get('direc_calle')
    data['direc_ciudad'] = request.POST.get('direc_ciudad')
    data['direc_cp'] = request.POST.get('direc_cp')
    data['direc_colonia'] = request.POST.get('direc_colonia')
    data['direc_estado'] = request.POST.get('direc_estado')

    data['lic_expedicion'] = request.POST.get('lic_expedicion')
    data['lic_emisora'] = request.POST.get('lic_emisora')
    data['lic_antiguedad'] = request.POST.get('lic_antiguedad')
    data['lic_tipo'] = request.POST.get('lic_tipo')
    data['lic_valido'] = request.POST.get('lic_valido')

    data['con_nombre'] = request.POST.get('con_nombre')
    data['con_apellido'] = request.POST.get('con_apellido')
    data['con_tel'] = request.POST.get('con_tel')

    # Obtener los archivos de las imágenes
    data['foto_file'] = request.FILES['foto_file']
    data['firma_file'] = request.FILES['firma_file']  

    return data


def det_tipo_licencia(tipo,tipo_sino):
        anverso, reverso = 0,0
        if tipo == "Tipo A - CHOFER A":
            anverso = 1 #pendiente
        elif tipo == "Tipo A - AUTOMOVILISTA":
            anverso = 2 #pendiente
        elif tipo == "Tipo B - CHOFER B":
            anverso = 3
        elif tipo == "Tipo C - CHOFER C":
            anverso = 4
        elif tipo == "Tipo E - CHOFER D":
            anverso = 5
        elif tipo == "Tipo M - MOTOCICLISTA":    
            anverso = 6 #pendiente

        if tipo_sino:
            reverso = 1
        else:    
            reverso = 2
        return anverso, reverso    