import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPComponent } from './owner-p.component';

describe('OwnerPComponent', () => {
  let component: OwnerPComponent;
  let fixture: ComponentFixture<OwnerPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
