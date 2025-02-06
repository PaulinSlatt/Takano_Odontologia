import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgendamentoService } from '../../agendamento.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-agende-consulta',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './agende-consulta.component.html',
  styleUrl: './agende-consulta.component.css'
})



export class AgendeConsultaComponent implements OnInit  {
  agendamentoForm!: FormGroup;
  mensagem: string | null = null;
  avisoSucesso: string | null = null;  
  avisoErro: string | null = null;  

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




  onSubmit(): void {
    console.log('Formulário enviado!');

    if (this.agendamentoForm.valid) {
      
      this.agendamentoService.agendarConsulta(this.agendamentoForm.value).subscribe(
        response => {
          this.avisoSucesso = 'Consulta agendada com sucesso! Entraremos em contato em breve para confirmação';
          setTimeout(() => {
            this.avisoSucesso = null;
          }, 10000);
        },
        error => {
          this.avisoErro = 'Erro ao agendar consulta. Tente novamente.';
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
