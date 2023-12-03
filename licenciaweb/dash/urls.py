from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views



urlpatterns = [
    #vistas render
    path('/view_dash',views.view_dash, name='view_dash'),


]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)