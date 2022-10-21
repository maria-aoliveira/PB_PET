import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCardHeaderComponent } from './pet-card-header.component';

describe('PetCardHeaderComponent', () => {
  let component: PetCardHeaderComponent;
  let fixture: ComponentFixture<PetCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetCardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
