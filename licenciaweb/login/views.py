from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
from licencias.models import Asignaciones
from django.views.decorators.http import require_http_methods
# Create your views here.
def view_fake_init(request):
    if request.user.is_authenticated:
        if request.user.is_superuser or request.user.is_staff:
            return redirect('view_dash')
        else:
            return redirect('view_mis_licencias')
    else:
        return render(request, 'login/fake/view_fake_init.html')

def view_logout(request):
    render(request, 'login/login/logout.html.html')

def fun_login(request):
    if request.method == 'POST': 
        data = json.loads(request.body.decode('utf-8'))

        username = data.get('username')
        password = data.get('password')    
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            
            return JsonResponse(data={'mensaje': 'Inicio de sesion correcto'})

        else:
            return JsonResponse(data={'error': 'El correo o la contraseña no son validos'}, status=401)
    else:
        return JsonResponse(data={'error': 'Método no permitido'}, status=400)        
    
def fun_logut(request):
    logout(request)
    return render(request, 'login/login/logout.html')    

def view_usuarios(request):
    users = User.objects.all().order_by('-id')
    for iter in users:
        try:
            iter.cantidad = Asignaciones.objects.get(user = iter).cantidad
        except:
            iter.cantidad = 'Sin limite'

    return render(request, 'login/users/users.html',{'users':users})

def fun_addUser(request):
    if request.method == 'POST':

        # obtener informacion
        user_name = request.POST.get('nameuser')
        mailuser = request.POST.get('mailuser')
        roluser = request.POST.get('roluser')
        asig = int(request.POST.get('asignaciones')) 
        passworduser = request.POST.get('passworduser')

        if int(roluser) == 0:
            user = User.objects.create_user(username=user_name, email=mailuser, password=passworduser, is_staff=True)
            user.save()
            return JsonResponse(data= {'mensaje': 'Miembro de la pagina: ' + user.username + ' creado exitosamente'})

        elif int(roluser) == 1:
            user = User.objects.create_user(username=user_name, email=mailuser, password=passworduser, is_superuser = True)
            user.save()

            return JsonResponse(data= {'mensaje': 'Administrador: ' + user.username + ' creado exitosamente'})
        else:
            user = User.objects.create_user(username=user_name, email=mailuser, password=passworduser)
            user.save()   
            asg = Asignaciones.objects.get(user = user)
            asg.cantidad = asig
            asg.save()
            return JsonResponse(data= {'mensaje': 'Usuario: ' + user.username + ' creado exitosamente'})
    else:
        return JsonResponse(data= {'error': 'Método no permitido'}, status=400)    
    
    

@require_http_methods(["POST"])
def fun_UpUser(request):
    # Obtener información del formulario
    user_id = request.POST.get('id_user_edit')
    user_name = request.POST.get('nameuser_edit')
    first_name = request.POST.get('nombre_edit')
    last_name = request.POST.get('apellido_edit')
    email = request.POST.get('mailuser_edit')
    role = int(request.POST.get('roluser_edit'))
    assignments = int(request.POST.get('asignaciones_edit'))
    password = request.POST.get('passworduser_edit')

    # Obtener el usuario
    user = User.objects.get(pk=user_id)

    # Actualizar los campos del usuario
    user.username = user_name
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    #los de stff y superuser no tienen asignaciones, entonces se crea
    if user.is_staff or user.is_superuser:
        asg = Asignaciones(
            user = user,
        )
        asg.save()
    #obtenemos las asignaciones    
    assignment = Asignaciones.objects.get(user=user)
    # Actualizar el rol del usuario
    if role == 0:
        user.is_staff = True
        user.is_superuser = False
        assignment.delete()
    elif role == 1:
        user.is_superuser = True
        user.is_staff = False
        assignment.delete()
    else:
        user.is_superuser = False
        user.is_staff = False 
        assignment.cantidad = assignments
        assignment.save()
    # Actualizar la contraseña si se proporcionó una nueva
    if password:
        user.set_password(password)
    
    # Guardar los cambios del usuario
    user.save()

    # Actualizar las asignaciones del usuario
 

    return JsonResponse({'mensaje': 'Usuario actualizado'})

@require_http_methods(["POST"])
def fun_delete_user(request):
   
    user = User.objects.get(pk = request.POST.get('id_user_edit'))
    user.delete()
    return JsonResponse({'mensaje': 'Usuario eliminado'})
