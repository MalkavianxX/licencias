from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Asignaciones

@receiver(post_save, sender=User)
def create_asignaciones(sender, instance, created, **kwargs):
    if created and not instance.is_staff and not instance.is_superuser:
        Asignaciones.objects.create(user=instance)
