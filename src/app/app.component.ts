import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AgendeConsultaComponent } from './componentes/agende-consulta/agende-consulta.component';
import { QuemSomosComponent } from './componentes/quem-somos/quem-somos.component';
import { NossosServicosComponent } from './componentes/nossos-servicos/nossos-servicos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AgendeConsultaComponent, QuemSomosComponent, NossosServicosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Takano_Odontologia';
}
