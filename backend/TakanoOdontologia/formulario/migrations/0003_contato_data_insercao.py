# Generated by Django 5.1.5 on 2025-01-21 22:43

from django.db import migrations, models
from datetime import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0002_contato_email_contato_nome_contato_primeira_consulta_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='contato',
            name='data_insercao',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=False,
        ),
    ]
