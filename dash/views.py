from django.shortcuts import render
from licencias.models import Licencia, Asignaciones
from django.contrib.auth.models import User
from django.db.models import Q
from .estadistica import *

# Create your views here.
def view_dash(request):

    difference, percentage_change = retros_licencia(7)
    data_gen = {
        'users': User.objects.all().count(),
        'admins': User.objects.filter(Q(is_staff=True) | Q(is_superuser=True)).count(),
        'licencias': Licencia.objects.all().count(),
        'asignaciones': Asignaciones.objects.all().count(),
        'lic_creadas': difference,
        'lic_creadas_perc':percentage_change,

    }

    
    return render(request, 'dash/sumary.html',{
        'data_general':data_gen,
        'char_top_licencia':top_licencia(),
        'top_users_licencias': top_users_licencias(),

    })

