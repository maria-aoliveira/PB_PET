import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SintomasComponent } from './sintomas.component';

describe('SintomasComponent', () => {
  let component: SintomasComponent;
  let fixture: ComponentFixture<SintomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SintomasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SintomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
