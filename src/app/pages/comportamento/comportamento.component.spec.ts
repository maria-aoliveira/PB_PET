import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComportamentoComponent } from './comportamento.component';

describe('ComportamentoComponent', () => {
  let component: ComportamentoComponent;
  let fixture: ComponentFixture<ComportamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComportamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComportamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
