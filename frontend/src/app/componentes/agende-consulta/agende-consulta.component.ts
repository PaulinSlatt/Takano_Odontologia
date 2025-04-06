import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgendamentoService } from '../../agendamento.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-agende-consulta',
  standalone: true,
  imports: [CommonModule, RecaptchaModule, ReactiveFormsModule],
  templateUrl: './agende-consulta.component.html',
  styleUrl: './agende-consulta.component.css'
})


  
export class AgendeConsultaComponent implements OnInit  {
  agendamentoForm!: FormGroup;
  mensagem: string | null = null;
  avisoSucesso: string | null = null;  
  avisoErro: string | null = null;  
  recaptchaToken: string = '';
  constructor(private fb: FormBuilder, private agendamentoService: AgendamentoService) {}


  ngOnInit(): void {
    this.agendamentoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      primeira_consulta: ['', Validators.required],
      tipo_consulta: ['', Validators.required],
      horario_preferencia: ['', Validators.required],
    });
    }


    onCaptchaResolved(captchaResponse: string | null) {
      if (captchaResponse) {
        // Handle the captcha response
        this.recaptchaToken = captchaResponse;
        console.log(captchaResponse);
    } else {
        console.error('Captcha response is null');
    }
    }

  onSubmit(): void {
    console.log('Formulário enviado!');

    if (this.agendamentoForm.valid) {
      
      this.agendamentoService.agendarConsulta(this.agendamentoForm.value, this.recaptchaToken).subscribe(
        response => {
          this.avisoSucesso = 'Consulta agendada com sucesso! Entraremos em contato em breve para confirmação';
          setTimeout(() => {
            this.avisoSucesso = null;
          }, 10000);
        },
        error => {

          if (error = 429) {
            this.avisoErro = 'Limite de agendamentos atingido, ou Captcha inválido. Tente novamente mais tarde.';
          }
          else if (error = 400) {
            this.avisoErro = 'Erro ao agendar consulta. Tente novamente';
          
          }
            console.error(error);
          setTimeout(() => {
            this.avisoErro = null;
          }, 10000);
        }
      );
    }
    else{
      this.avisoErro = 'Campos sem preenchimento. Tente novamente!';
          setTimeout(() => {
            this.avisoErro = null;
          }, 10000);
    }
  }
}
