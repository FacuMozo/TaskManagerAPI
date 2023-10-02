import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectListComponent } from './proyect-list.component';

describe('ProyectListComponent', () => {
  let component: ProyectListComponent;
  let fixture: ComponentFixture<ProyectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
