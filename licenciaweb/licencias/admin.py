from django.contrib import admin
from .models import Licencia, Asignaciones
class LicenciaAdmin(admin.ModelAdmin):
    list_display = ('user', 'datos_nombres', 'datos_curp', 'lic_tipo','lic_expedicion')
class AsignacionesAdmin(admin.ModelAdmin):
    list_display = ('user','cantidad','status','usadas','fecha')

admin.site.register(Licencia)
admin.site.register(Asignaciones,AsignacionesAdmin)
