from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views



urlpatterns = [

    path('view_add_lic',views.view_add_lic, name='view_add_lic'),
    path('view_watch_licencia/<str:id>/',views.view_watch_licencia, name="view_watch_licencia"),
    path('view_mis_licencias',views.view_mis_licencias, name="view_mis_licencias"),
    path('view_edit_licencia/<str:id>/',views.view_edit_licencia, name="view_edit_licencia"),
    path('view_mis_asignaciones',views.view_mis_asignaciones, name="view_mis_asignaciones"),

    #funciones json
    path('fun_save_licencia', views.fun_save_licencia, name="fun_save_licencia"),
    path('fun_up_licencia', views.fun_up_licencia, name="fun_up_licencia"),
    path('fun_Up_asignaciones', views.fun_Up_asignaciones, name="fun_Up_asignaciones"),


    #imagene
    path('get_foto/<int:image_id>/', views.get_foto, name='get_foto'),
    path('get_firma/<int:image_id>/', views.get_firma, name='get_firma'),
    path('guardar_anverso', views.guardar_anverso, name="guardar_anverso"),
    path('guardar_reverso', views.guardar_reverso, name="guardar_reverso"),
    path('toPDF', views.toPDF, name="toPDF"),

    path("validar_licencia_id/<int:id>/", views.validar_licencia_id, name="validar_licencia_id"),

]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)