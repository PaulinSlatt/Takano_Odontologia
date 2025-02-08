from django.urls import path
from .views import enviar_agenda

urlpatterns = [
    path('enviar-agenda', enviar_agenda, name='enviar-agenda')
]