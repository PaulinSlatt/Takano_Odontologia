from django.shortcuts import render
import json
import django.core.mail import send_email
import django.http import JsonResponse
import django.views.decorators.csrf import csrf_exempt
# Create your views here.


@csrf_exempt
def enviar_agenda(request):
    if request.method == 'POST':
        dados = json.loads(request.body)
        nome = dados.get('nome')
        email = dados.get('email')
        phone_number = dados.get('telefone')
        primeira_consulta = dados.get('primeira_consulta')
        tipo_consulta = dados.get('tipo_consulta')
        horario_preferencia = dados.get('horario_preferencia')

        send_email(
            f'Agendamento solicitado: {nome}',
            f'nome: {nome} ',
            f'email: {email}',
            f'Telefone de contato: {phone_number}',
            f'Primeira consulta? {primeira_consulta}',
            f'Tipo de consulta: {tipo_consulta}',
            f'Horario preferencial: {horario_preferencia}'
        )

        return JsonResponse({'status': 'sucesso'}, status=200)
    return JsonResponse({'error': 'Método não permitido'}, status=405)