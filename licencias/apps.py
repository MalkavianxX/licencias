from django.apps import AppConfig


class LicenciasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'licencias'

    def ready(self):
        import licencias.signals  # Importa las señales al iniciar la aplicación