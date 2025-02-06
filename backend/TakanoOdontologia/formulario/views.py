from django.shortcuts import render
import json
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contato
from django.template.loader import render_to_string  # Para usar templates HTML


# Create your views here.


@csrf_exempt
def enviar_agenda(request):
     if request.method == 'POST':

        try:
            # Parse os dados do formulário
            data = json.loads(request.body)
            print(data)  # Log para verificar os dados recebidos

            # Crie o registro no banco de dados
            contato = Contato.objects.create(
                nome=data.get('nome'),
                email=data.get('email'),
                phone_number=data.get('phone_number'),
                primeira_consulta=data.get('primeira_consulta') == 'true',
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
    mensagem_html = render_to_string('formulario/email_template.html', {'contato': contato})

    send_mail(
        assunto,
        f"""Cliente {contato.nome} solicitou um agendamento!

        Nome: {contato.nome},
        E-mail: {contato.email},
        Telefone: {contato.phone_number},
        Primeira Consulta?  {'Sim' if contato.primeira_consulta else 'Não'}
        Tipo de consulta: {contato.tipo_consulta}
        Horário preferido: {contato.horario_preferencia}
        """,
        'EmailEnvio@gmail.com',
        ['secretaria@takanoOdontologia.com'],  # Ajuste com o e-mail real do cliente
        fail_silently=False,
        html_message=mensagem_html 
    )