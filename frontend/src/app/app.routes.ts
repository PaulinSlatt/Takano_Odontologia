import { Routes } from '@angular/router';
import { AgendeConsultaComponent } from './componentes/agende-consulta/agende-consulta.component';
import { QuemSomosComponent } from './componentes/quem-somos/quem-somos.component';
import { NossosServicosComponent } from './componentes/nossos-servicos/nossos-servicos.component';
import { DentistasComponent } from './componentes/dentistas/dentistas.component';
import { FaleConoscoComponent } from './componentes/fale-conosco/fale-conosco.component';

export const routes: Routes = [
  { path: '', component: AgendeConsultaComponent }, 
  { path: 'agende-consulta', component: AgendeConsultaComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'nossos-servicos', component: NossosServicosComponent },
  { path: 'dentistas', component: DentistasComponent },
  { path: 'fale-conosco', component: FaleConoscoComponent }
];