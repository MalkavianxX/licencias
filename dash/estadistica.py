from datetime import datetime, timedelta
from django.db.models import Count
from licencias.models import Licencia
from django.contrib.auth.models import User
import json
from django.core.serializers.json import DjangoJSONEncoder

#Para obtener cuántas licencias se han creado en comparación con hace 7 días:
def retros_licencia(days = 7):

    # Obtén la fecha actual y la fecha de hace 7 días
    now = datetime.now()
    one_week_ago = now - timedelta(days=days)

    # Obtén la cantidad de licencias creadas en los últimos 7 días
    new_licenses = Licencia.objects.filter(fecha__range=[one_week_ago, now]).count()

    # Obtén la cantidad de licencias creadas en los 7 días anteriores
    old_licenses = Licencia.objects.filter(fecha__range=[one_week_ago - timedelta(days=7), one_week_ago]).count()

    # Calcula la diferencia
    difference = new_licenses - old_licenses
    # Calcula el porcentaje de cambio
    if old_licenses != 0:
        percentage_change = (difference / old_licenses) * 100
    else:
        percentage_change = 100 if new_licenses > 0 else 0

    return difference, percentage_change

#Para obtener los “lic_tipo” más usados (top de todos desde el mayor al menor), con su respectivo %:
def top_licencia():
    # Obtén la cantidad total de licencias
    total_licenses = Licencia.objects.count()

    # Obtén los tipos de licencia más usados
    license_types = Licencia.objects.values('lic_tipo').annotate(count=Count('lic_tipo')).order_by('-count')

    # Calcula el porcentaje para cada tipo de licencia
    for license_type in license_types:
        license_type['percentage'] = (license_type['count'] / total_licenses) * 100

    # Convierte el queryset a una lista de diccionarios
    license_types_list = list(license_types)

    # Convierte la lista de diccionarios a JSON
    license_types_json = json.dumps(license_types_list, cls=DjangoJSONEncoder)

    return license_types_json


#Para obtener el top 5 de usuarios que más han creado licencias:
def top_users_licencias():
    # Obtén el top 5 de usuarios que más han creado licencias
    top_users = User.objects.annotate(license_count=Count('licencia')).order_by('-license_count')[:5]

    # Crea una lista para almacenar los usuarios y sus conteos de licencias
    top_users_with_counts = []

    # Recorre los usuarios y agrega sus nombres de usuario y conteos de licencias a la lista
    for user in top_users:
        top_users_with_counts.append({
            'username': user.username,
            'license_count': user.license_count
        })

    return top_users_with_counts
