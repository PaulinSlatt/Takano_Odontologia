from django.shortcuts import render
import json
from django.core.mail import send_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contato


# Create your views here.


@csrf_exempt
def enviar_agenda(request):
     if request.method == 'POST':
        try:
            # Parse os dados do formulário
            data = json.loads(request.body)
            
            # Crie o registro no banco de dados
            contato = Contato.objects.create(
                primeira_consulta=data.get('primeira_consulta') == 'sim',
                tipo_consulta=data.get('tipo_consulta'),
                horario_preferencia=data.get('horario_preferencia'),
            )
            
            # Envio de e-mail
            enviar_email(contato)

            return JsonResponse({'message': 'Consulta agendada com sucesso!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
     return JsonResponse({'error': 'Método não permitido'}, status=405)


def enviar_email(contato):
    assunto = "Confirmação de Agendamento"
    mensagem = f"""
    Olá, seu agendamento foi confirmado com sucesso! Aqui estão os detalhes:
    
    - Primeira consulta: {'Sim' if contato.primeira_consulta else 'Não'}
    - Tipo de consulta: {contato.tipo_consulta}
    - Horário preferido: {contato.horario_preferencia}
    """
    send_email(
        assunto,
        mensagem,
        'seu_email@gmail.com',
        ['email_cliente@example.com'],  # Ajuste com o e-mail real do cliente
        fail_silently=False,
    )