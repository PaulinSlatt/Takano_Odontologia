import { AfterViewInit, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AgendeConsultaComponent } from './componentes/agende-consulta/agende-consulta.component';
import { QuemSomosComponent } from './componentes/quem-somos/quem-somos.component';
import { NossosServicosComponent } from './componentes/nossos-servicos/nossos-servicos.component';
import { DentistasComponent } from "./componentes/dentistas/dentistas.component";
import { FaleConoscoComponent } from "./componentes/fale-conosco/fale-conosco.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AgendeConsultaComponent, QuemSomosComponent, NossosServicosComponent, DentistasComponent, FaleConoscoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Takano_Odontologia';
  
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  }
}


