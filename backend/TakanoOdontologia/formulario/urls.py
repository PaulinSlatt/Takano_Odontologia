from django.urls import path
from .views import enviar_agenda

urlpatterns = [
    path('enviar-formulario', enviar_agenda, name='enviar_formulario')
]