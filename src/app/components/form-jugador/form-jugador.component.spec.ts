import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJugadorComponent } from './form-jugador.component';

describe('FormJugadorComponent', () => {
  let component: FormJugadorComponent;
  let fixture: ComponentFixture<FormJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
