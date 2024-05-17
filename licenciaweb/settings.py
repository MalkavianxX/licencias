"""
Django settings for licenciaweb project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/ 

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-e#s=bi3sh8=($*x*l858^gmo6h6)nz%orojc66ma^gzy&9+w%8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


ALLOWED_HOSTS = ['*']
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'login',
    'dash',
    'licencias',
    'django_bunny',
    'corsheaders',


]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',

]

ROOT_URLCONF = 'licenciaweb.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'licenciaweb.wsgi.application'

DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5 MB

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'licenciasweb',
        'USER': 'root',
        'PASSWORD': 'Rmpv54321',
        'HOST': 'postgresql-172484-0.cloudclusters.net',  # Puedes cambiar esto según tu configuración de PostgreSQL
        'PORT': '10058',       # Puerto predeterminado de PostgreSQL
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'es-mx'

TIME_ZONE = 'America/Mexico_City'

USE_I18N = True

USE_L10N = True
 
USE_TZ = True


CSRF_TRUSTED_ORIGINS = [ 'http://squid-app-uwuxh.ondigitalocean.app','https://squid-app-uwuxh.ondigitalocean.app' 'http://35.175.211.73','http://100.24.66.1','http://licenapp.cloud', 'https://licenapp.cloud','https://licencias-bajacalifornia-gob.com','http://licencias-bajacalifornia-gob.com',]


# Estas se pueden encontrar en el panel de control de tu almacenamiento en `FTP & API Access`
BUNNY_USERNAME = "turixstatic"
BUNNY_PASSWORD = "cb58e653-373f-432f-9cd02f0643ee-cf5a-43ff"
# Este es el código de la región de almacenamiento. Por ejemplo, Los Ángeles es `la`, Singapur es `sg`, etc. El valor predeterminado es `ny` (Nueva York).
BUNNY_REGION = "la"
# Opcional. Por ejemplo, `https://myzone.b-cdn.net/`. Se utilizará `MEDIA_URL` si no se establece esto.
BUNNY_HOSTNAME = "https://staticurix.b-cdn.net/"
# Opcional. Por ejemplo, `static/`. Si no se establece, los archivos se almacenarán en el directorio raíz del almacenamiento.
BUNNY_BASE_DIR = "static/"


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT =  os.path.join(BASE_DIR,'static') 
MEDIA_URL= '/media/'
MEDIA_ROOT =  os.path.join(BASE_DIR,'media')

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",
    "https://squid-app-uwuxh.ondigitalocean.app",
]
