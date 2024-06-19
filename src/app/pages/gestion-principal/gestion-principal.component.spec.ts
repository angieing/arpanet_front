import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPrincipalComponent } from './gestion-principal.component';

describe('GestionPrincipalComponent', () => {
  let component: GestionPrincipalComponent;
  let fixture: ComponentFixture<GestionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
