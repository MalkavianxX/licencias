# Generated by Django 5.0.3 on 2024-04-03 21:23

import django_bunny.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('licencias', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='licencia',
            name='pdf',
            field=models.FileField(blank=True, null=True, storage=django_bunny.storage.BunnyStorage(), upload_to='pdfs/'),
        ),
    ]
