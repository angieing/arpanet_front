import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIndicadoresComponent } from './gestion-indicadores.component';

describe('GestionIndicadoresComponent', () => {
  let component: GestionIndicadoresComponent;
  let fixture: ComponentFixture<GestionIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionIndicadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
