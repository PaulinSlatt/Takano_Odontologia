import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendeConsultaComponent } from './agende-consulta.component';

describe('AgendeConsultaComponent', () => {
  let component: AgendeConsultaComponent;
  let fixture: ComponentFixture<AgendeConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendeConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendeConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
