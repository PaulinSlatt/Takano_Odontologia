import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistasComponent } from './dentistas.component';

describe('DentistasComponent', () => {
  let component: DentistasComponent;
  let fixture: ComponentFixture<DentistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
