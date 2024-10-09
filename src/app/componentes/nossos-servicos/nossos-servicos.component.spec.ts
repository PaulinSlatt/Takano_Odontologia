import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NossosServicosComponent } from './nossos-servicos.component';

describe('NossosServicosComponent', () => {
  let component: NossosServicosComponent;
  let fixture: ComponentFixture<NossosServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NossosServicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NossosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
