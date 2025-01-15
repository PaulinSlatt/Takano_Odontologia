from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


class Contato(models.Model):

    class TipoConsulta(models.TextChoices):
        GERAL = 'Avaliação Geral'
        Emergencial = 'Emergencial'
        OUTROS = 'Outros'

    class PeriodoConsulta(models.TextChoices):
        MANHA =  "Manhã"
        TARDE =  "Tarde"
        NOITE =  "Noite"


    nome = models.CharField(),
    email = models.EmailField(),
    phone_number = PhoneNumberField(blank=True)
    primeira_consulta = models.BooleanField(
                        default=False,
                        verbose_name="É sua primeira consulta?"
                            ),
    tipo_consulta = models.CharField(
                    max_length=15,
                    choices=TipoConsulta.choices,
                    verbose_name="Tipo de consulta",
                    default=TipoConsulta.GERAL,
                ),
    horario_preferencia = models.CharField(
                        max_length=10,
                        choices=PeriodoConsulta.choices,
                        verbose_name="Horário de preferência",
                        default=PeriodoConsulta.MANHA,
                    )
    def __str__(self):
        return self.nome


