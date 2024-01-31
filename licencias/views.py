from django.http import JsonResponse
from django.shortcuts import render
import json
from .models import Licencia, Folio, Asignaciones
from django.utils import timezone
from .recovery_fun import recovery_save, det_tipo_licencia
from django.forms.models import model_to_dict
import base64
import requests

def url_a_base64(url_imagen):
    # Obtiene la imagen de la URL
    with open(url_imagen, 'rb') as imagen_archivo:
        return base64.b64encode(imagen_archivo.read()).decode('utf-8')


# Create your views here.
def view_add_lic(request):
    
    return render(request,'licencias/base/view_add_lic.html')

def fun_save_licencia(request):
    if request.method == 'POST':
  
        #crear nuevo folio
        nuevo_folio = Folio(creador = request.user,texto = 'BC2023')
        nuevo_folio.save()
        nuevo_folio.add_folio()
        
        data = recovery_save(request)
    


        licencia = Licencia(
            user=request.user,
            folio = nuevo_folio,
            datos_nombres=data['datos_nombres'],
            datos_apellidos=data['datos_apellidos'],
            datos_curp=data['datos_curp'],
            datos_sangre=data['datos_sangre'],
            datos_sexo=data['datos_sexo'],
            datos_nacionalidad=data['datos_nacionalidad'],
            datos_restriacciones=data['datos_restriacciones'],
            datos_nacimiento=timezone.datetime.strptime(data['datos_nacimiento'], '%Y-%m-%d').date(),
            datos_rfc=data['datos_rfc'],
            datos_donante=data['datos_donante'] ,

            direc_calle=data['direc_calle'],
            direc_ciudad=data['direc_ciudad'],
            direc_cp=data['direc_cp'],
            direc_colonia=data['direc_colonia'],
            direc_estado=data['direc_estado'],

            lic_expedicion=timezone.datetime.strptime(data['lic_expedicion'], '%Y-%m-%d').date(),
            lic_emisora=data['lic_emisora'],
            lic_antiguedad=timezone.datetime.strptime(data['lic_antiguedad'], '%Y-%m-%d').date(),
            lic_tipo=data['lic_tipo'],
            lic_valido=data['lic_valido'],

            con_nombre=data['con_nombre'],
            con_apellido=data['con_apellido'],
            con_tel=data['con_tel'],

            foto_file=data['foto_file'],
            firma_file=data['firma_file'],
        )

        # Guardar la nueva instancia de Licencia en la base de datos
        licencia.save()
        if request.user.is_staff or request.user.is_superuser:
            pass
        else:
            asg = Asignaciones.objects.get(user = request.user)
            asg.usar()
        return JsonResponse(data= {'mensaje': 'Datos recibidos correctamente','id':licencia.id})
   
    else:
        return JsonResponse(data= {'error': 'Método no permitido'}, status=400)
    

def view_watch_licencia(request,id):
    licencia = Licencia.objects.get(pk=id)
    suma = int(licencia.lic_expedicion.strftime('%Y')) + int(licencia.lic_valido)
    if suma > 2029:
        licencia.lic_valido_temp = "PERMANENTE"
    else:
        licencia.lic_valido_temp = licencia.lic_expedicion.strftime('%d') +'/'+ licencia.lic_expedicion.strftime('%m') +'/'+ str(suma)

    licencia.lic_valido = licencia.lic_expedicion.strftime('%d') +'/'+ licencia.lic_expedicion.strftime('%m') +'/'+ str()

    licencia.datos_nacimiento = licencia.datos_nacimiento.strftime('%d/%m/%Y')
    licencia.lic_expedicion = licencia.lic_expedicion.strftime('%d/%m/%Y')
    licencia.lic_antiguedad = licencia.lic_antiguedad.strftime('%d/%m/%Y')
    anverso,reverso = det_tipo_licencia(licencia.lic_tipo, licencia.datos_donante)
 
    
    return render(request, 'licencias/base/view_mi_licencia.html',{'licencia':licencia,'anverso':anverso,'reverso':reverso})    

def view_mis_licencias(request):
    if request.user.is_superuser or request.user.is_staff:
        licencias = Licencia.objects.all().order_by('-fecha')
    else:
        licencias = Licencia.objects.filter(user = request.user).order_by('-fecha')

    for iter in licencias:
        try:
            suma = int(iter.lic_expedicion.strftime('%Y')) + int(iter.lic_valido)
            if suma > 2029:
                iter.lic_valido_temp = "PERMANENTE"
            else:
                iter.lic_valido_temp = iter.lic_expedicion.strftime('%d') +'/'+ iter.lic_expedicion.strftime('%m') +'/'+ str(suma)

        except:
            iter.lic_valido_temp = "ERROR"
        iter.lic_expedicion = iter.lic_expedicion.strftime('%d/%m/%Y')
    for i in licencias:
        print(i.lic_expedicion)
    return render(request, 'licencias/base/view_mis_licencias.html',{'licencias':licencias})

def view_edit_licencia(request,id):
    licencia = Licencia.objects.get(pk=id)

    licencia.datos_nacimiento = licencia.datos_nacimiento.strftime('%Y-%m-%d')
    licencia.lic_expedicion = licencia.lic_expedicion.strftime('%Y-%m-%d')
    licencia.lic_antiguedad = licencia.lic_antiguedad.strftime('%Y-%m-%d')
    anverso,reverso = det_tipo_licencia(licencia.lic_tipo, licencia.datos_donante)
 
    return render(request, "licencias/base/view_edit_licencia.html",{
        'licencia':licencia,
        'anverso':anverso,
        'reverso':reverso,

        })


def fun_up_licencia(request):
    if request.method == 'POST':
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



        data['id'] = request.POST.get('id')

        licencia_up = Licencia.objects.get(pk = data['id'])

        if 'foto_file' in request.FILES:
            data['foto_file'] = request.FILES['foto_file']
            licencia_up.foto_file = data['foto_file']


        if 'firma_file' in request.FILES:
            data['firma_file'] = request.FILES['firma_file']
            licencia_up.firma_file = data['firma_file']


        licencia_up.datos_nombres = data['datos_nombres']
        licencia_up.datos_apellidos = data['datos_apellidos']
        licencia_up.datos_curp = data['datos_curp']
        licencia_up.datos_sangre = data['datos_sangre']
        licencia_up.datos_sexo =  data['datos_sexo']
        licencia_up.datos_nacionalidad = data['datos_nacionalidad']
        licencia_up.datos_restriacciones = data['datos_restriacciones']
        licencia_up.datos_nacimiento = timezone.datetime.strptime(data['datos_nacimiento'], '%Y-%m-%d').date()
        licencia_up.datos_rfc = data['datos_rfc']
        licencia_up.datos_donante = data['datos_donante']

        licencia_up.direc_calle = data['direc_calle']
        licencia_up.direc_ciudad = data['direc_ciudad']
        licencia_up.direc_cp = data['direc_cp']
        licencia_up.direc_colonia = data['direc_colonia']
        licencia_up.direc_estado = data['direc_estado']

        licencia_up.lic_expedicion = timezone.datetime.strptime(data['lic_expedicion'], '%Y-%m-%d').date()
        licencia_up.lic_emisora = data['lic_emisora']
        licencia_up.lic_antiguedad = timezone.datetime.strptime(data['lic_antiguedad'], '%Y-%m-%d').date()
        licencia_up.lic_tipo = data['lic_tipo']
        licencia_up.lic_valido = data['lic_valido']

        licencia_up.con_nombre = data['con_nombre']
        licencia_up.con_apellido = data['con_apellido']
        licencia_up.con_tel = data['con_tel']


        # Guardar la nueva instancia de Licencia en la base de datos
        licencia_up.save()
        print("ok")
        return JsonResponse(data= {'mensaje': 'Datos recibidos correctamente'})
   
    else:
        return JsonResponse(data= {'error': 'Método no permitido'}, status=400)
    

def view_mis_asignaciones(request):
    # Comprueba si el usuario es administrador o personal
    es_admin_o_personal = request.user.is_staff or request.user.is_superuser

    # Obtiene las asignaciones correspondientes
    if es_admin_o_personal:
        asignaciones = Asignaciones.objects.all()

    else:
        asignaciones = Asignaciones.objects.filter(user=request.user)
    # Ordena las asignaciones por fecha en orden descendente
    asignaciones = asignaciones.order_by('-fecha')

    # Renderiza la plantilla con las asignaciones
    return render(request, 'licencias/asignacion/view_asignaciones.html', {'asgs': asignaciones,'flag': es_admin_o_personal})

def fun_Up_asignaciones(request):
    if request.method == 'POST':

        asgn = Asignaciones.objects.get(pk = request.POST.get('id_asgn'))
        cantidad = int(request.POST.get('cant_asignada'))

        if cantidad < 0:
            return JsonResponse(data = {'error': 'La cantidad no puede ser menor que cero.','status':'400'}, status=200)
        else:
            asgn.cantidad = cantidad
            asgn.save()
            return JsonResponse(data= {'mensaje': 'Datos recibidos correctamente'})
   
    else:
        return JsonResponse(data= {'error': 'Método no permitido'}, status=400)
    


def validar_licencia(request,XWOPSLT,FFTWRPTO):
    try:
        licencia = Licencia.objects.get(pk=XWOPSLT)  # Intenta obtener la instancia del modelo
        data = model_to_dict(licencia, exclude=["foto_file", "firma_file"])  # Conviértelo a un diccionario
        data['folio'] = licencia.folio.texto  # Agrega el atributo 'texto' del objeto 'Folio' asociado
        data['lic_expedicion'] = licencia.lic_expedicion.strftime('%d/%m/%Y')
        data['valido'] = licencia.lic_expedicion.strftime('%d') +'/'+ licencia.lic_expedicion.strftime('%m') +'/'+ str(int(licencia.lic_expedicion.strftime('%Y')) + int(licencia.lic_valido))
        print(data["valido"])
        return JsonResponse(data)  # Retorna los datos como una respuesta JSON
    except Licencia.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)
