from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views



urlpatterns = [
    #vistas render
    path('',views.view_fake_init, name='view_fake_init'),
    path('view_logout',views.view_logout, name='view_logout'),
    path('view_usuarios',views.view_usuarios, name='view_usuarios'),


    #funciones
    path('fun_login',views.fun_login, name="fun_login"),
    path('fun_logut',views.fun_logut, name="fun_logut"),
    path('fun_addUser',views.fun_addUser, name="fun_addUser"),
    path('fun_UpUser',views.fun_UpUser, name="fun_UpUser"),
    path('fun_delete_user',views.fun_delete_user, name="fun_delete_user"),

]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)