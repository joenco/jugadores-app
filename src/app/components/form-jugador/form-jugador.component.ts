import { Component, EventEmitter, Output, OnInit, Inject, forwardRef } from '@angular/core';
import { JugadorModel } from '../../models/jugador.model';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';

@Component({
  selector: 'app-form-jugador',
  templateUrl: './form-jugador.component.html',
  styleUrls: ['./form-jugador.component.css']
})
export class FormJugadorComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<JugadorModel>;
  fg: FormGroup;
  minLongitud = 3;
  searchResults: string[];

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded = new EventEmitter();

  this.fg = fb.group({
    nombre: ['', Validators.compose([
      Validators.required,
      this.nombreValidator,
      this.nombreValidatorParametrizable(this.minLongitud)
    ])],
    apellido: ['', Validators.compose([
      Validators.required,
      this.apellidoValidator,
      this.apellidoValidatorParametrizable(this.minLongitud)
    ])],
    url: [''],
    pais: ['', Validators.compose([
      Validators.required,
      this.paisValidator,
      this.paisValidatorParametrizable(this.minLongitud)
    ])],
    posicion: ['', Validators.compose([
      Validators.required,
      this.posicionValidator,
      this.posicionValidatorParametrizable(this.minLongitud)
    ])]
  });

  this.fg.valueChanges.subscribe(
    (form: any) => {
      console.log('form cambió:', form);
    }
  );

  this.fg.controls['nombre'].valueChanges.subscribe(
    (value: string) => {
      console.log('nombre cambió:', value);
    }
  );
  }

  ngOnInit() {
    const elePais = <HTMLInputElement>document.getElementById('pais');
  fromEvent(elePais, 'input')
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 3),
      debounceTime(120),
      distinctUntilChanged(),
      switchMap((text: string) => ajax(this.config.apiEndpoint + '/paises?q=' + text))
    ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response);
  }

  guardar(nombre: string, apellido: string, url: string, pais: string, posicion: string, nroCamiseta: string): boolean {
    const d = new JugadorModel(nombre, apellido, url, pais, posicion, nroCamiseta);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {
  const l = control.value.toString().trim().length;
  if (l > 0 && l < 3) {
    return {invalidNombre: true};
  }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
      return (control: FormControl): { [key: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
        if (l > 0 && l < minLong) {
              return { 'minLongNombre': true };
          }
          return null;
      };
  }

  apellidoValidator(control: FormControl): { [s: string]: boolean } {
  const l = control.value.toString().trim().length;
  if (l > 0 && l < 3) {
    return {invalidapellido: true};
  }
    return null;
  }

  apellidoValidatorParametrizable(minLong: number): ValidatorFn {
      return (control: FormControl): { [key: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
        if (l > 0 && l < minLong) {
              return { 'minLongapellido': true };
          }
          return null;
      };
  }

  paisValidator(control: FormControl): { [s: string]: boolean } {
  const l = control.value.toString().trim().length;
  if (l > 0 && l < 3) {
    return {invalidpais: true};
  }
    return null;
  }

  paisValidatorParametrizable(minLong: number): ValidatorFn {
      return (control: FormControl): { [key: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
        if (l > 0 && l < minLong) {
              return { 'minLongpais': true };
          }
          return null;
      };
  }

  posicionValidator(control: FormControl): { [s: string]: boolean } {
  const l = control.value.toString().trim().length;
  if (l > 0 && l < 3) {
    return {invalidposicion: true};
  }
    return null;
  }

  posicionValidatorParametrizable(minLong: number): ValidatorFn {
      return (control: FormControl): { [key: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
        if (l > 0 && l < minLong) {
              return { 'minLongposicion': true };
          }
          return null;
      };
  }

}
