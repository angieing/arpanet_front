import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarTurnosComponent } from './generar-turnos.component';

describe('GenerarTurnosComponent', () => {
  let component: GenerarTurnosComponent;
  let fixture: ComponentFixture<GenerarTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarTurnosComponent]
    });
    fixture = TestBed.createComponent(GenerarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
