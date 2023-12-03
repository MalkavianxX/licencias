from django.db import models
from django.contrib.auth.models import User
import random

class LimiteExcedidoError(Exception):
    """Excepción lanzada cuando el usuario excede su límite."""
    pass
class Folio(models.Model):
    creador = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.CharField(max_length=14)
    
    def add_folio(self):
        self.texto = str(self.texto) + str(random.randint(10000000, 99999999))
        self.save()

    def __str__(self) -> str:
        return self.texto


class Licencia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    folio = models.ForeignKey(Folio, on_delete=models.CASCADE, blank=True, null=True)
    datos_nombres = models.CharField(max_length=255) 
    datos_apellidos = models.CharField(max_length=255)
    datos_curp = models.CharField(max_length=20)
    datos_sangre = models.CharField(max_length=15)
    datos_sexo = models.CharField(max_length=10)
    datos_nacionalidad = models.CharField(max_length=255)
    datos_restriacciones = models.TextField()
    datos_nacimiento = models.DateField()
    datos_rfc = models.CharField(max_length=13)
    datos_donante = models.BooleanField()

    direc_calle = models.CharField(max_length=255)
    direc_ciudad = models.CharField(max_length=255)
    direc_cp = models.CharField(max_length=5)
    direc_colonia = models.CharField(max_length=255)
    direc_estado = models.CharField(max_length=255)

    lic_expedicion = models.DateField()
    lic_emisora = models.CharField(max_length=255)
    lic_antiguedad = models.DateField()
    lic_tipo = models.CharField(max_length=255)
    lic_valido = models.CharField(max_length=20, blank=True, null=True)

    con_nombre = models.CharField(max_length=255)
    con_apellido = models.CharField(max_length=255)
    con_tel = models.CharField(max_length=10)

    foto_file = models.ImageField(upload_to='fotos/')
    firma_file = models.ImageField(upload_to='firmas/')

    fecha = models.DateField(auto_now_add= True)

    class Meta:
        ordering = ["datos_nombres"]
        verbose_name_plural = 'Licencias'
 
    def __str__(self):
        return self.datos_nombres
    
class Asignaciones(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    usadas = models.IntegerField(default= 0)
    restantes = models.IntegerField(default= 0)
    fecha = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.user.first_name)

    def usar(self):
        cantidad = self.usadas + 1

        if cantidad >= self.cantidad:
            self.status = False
            self.save()
            raise LimiteExcedidoError("El usuario ha excedido sus folios.")
        else:
            self.usadas = cantidad
            self.restantes = self.cantidad - cantidad
            self.save()

    def get_restantes(self):
        return str(self.cantidad - self.usadas)