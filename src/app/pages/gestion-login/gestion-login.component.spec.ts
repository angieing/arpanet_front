import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLoginComponent } from './gestion-login.component';

describe('GestionLoginComponent', () => {
  let component: GestionLoginComponent;
  let fixture: ComponentFixture<GestionLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionLoginComponent]
    });
    fixture = TestBed.createComponent(GestionLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
