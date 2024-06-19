import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVendedoresComponent } from './gestion-vendedores.component';

describe('GestionVendedoresComponent', () => {
  let component: GestionVendedoresComponent;
  let fixture: ComponentFixture<GestionVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVendedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
