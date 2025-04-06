from django.shortcuts import render
import json
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .models import Contato
from django.template.loader import render_to_string  # Para usar templates HTML
from django.conf import settings
import requests
import json

# Create your views here.


@csrf_exempt
def enviar_agenda(request):
     if request.method == 'POST':
        recaptcha_token = request.headers.get('x-Recaptcha-token')
        print('token:', recaptcha_token)  # Log para verificar o token do reCAPTCHA
         # Valida o token com o Google
        recaptcha_secret = settings.RECAPTCHA_SECRET_KEY
        print('secret', recaptcha_secret)

        recaptcha_response = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': settings.RECAPTCHA_SECRET_KEY,
                'response': recaptcha_token
            }
          )

        result = recaptcha_response.json()
        print(result)  # Log para verificar a resposta do Google
        if not result.get('success'):
             return JsonResponse({'error': 'ReCAPTCHA inválido.'}, status=429)
        print("ReCAPTCHA validado com sucesso!")
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
            print(contato)  # Log para verificar se o registro foi criado
            # Envio de e-mail
            log_envio_email = enviar_email(contato)
            print(log_envio_email)  # Log para verificar se o e-mail foi enviado
            return JsonResponse({'message': 'Consulta agendada com sucesso!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
     return JsonResponse({'error': 'Método não permitido'}, status=405)


def enviar_email(contato):
    assunto = "Confirmação de Agendamento"
    mensagem_html = render_to_string('formulario/email_template.html', {'contato': contato})
    
    # Verificando se os parâmetros obrigatórios não são None
    if not all([assunto, mensagem_html, contato.email]):
        print("Erro: Um ou mais parâmetros obrigatórios estão indefinidos.")
        return "Erro: Parâmetros obrigatórios indefinidos."

    try:
        retorno = send_mail(
            assunto,
            f"""Cliente {contato.nome} solicitou um agendamento!
            Nome: {contato.nome},
            E-mail: {contato.email},
            Telefone: {contato.phone_number},
            Primeira Consulta?  {'Sim' if contato.primeira_consulta else 'Não'}
            Tipo de consulta: {contato.tipo_consulta}
            Horário preferido: {contato.horario_preferencia}
            """,
            'no-reply@example.com',
            ['secretaria@takanoOdontologia.com'],  # Ajuste com o e-mail real do cliente
            fail_silently=True,
            html_message=mensagem_html 
            )
        return "E-mail enviado com sucesso!"
    except Exception as e:
        print('Erro ao enviar e-mail:', str(e))
        return "Erro ao enviar e-mail"
    


def validar_captcha(token):
    secret = 'SUA_SECRET_KEY'
    response = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={'secret': secret, 'response': token}
    )
    return response.json().get('success', False)