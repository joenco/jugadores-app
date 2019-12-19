import {Injectable, Inject, forwardRef} from '@angular/core';
import { JugadorModel } from './jugador.model';
import { Store } from '@ngrx/store';
import { NuevoJugadorAction, ElegidoFavoritoAction } from './jugadores-state.model';
import {AppState, APP_CONFIG, AppConfig, MyDatabase, db} from './../app.module';
import { HttpRequest, HttpHeaders, HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class JugadoresApiClient {
  jugadores: JugadorModel[] = [];

  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient
  ) {
    this.store
      .select(state => state.jugadores)
      .subscribe((data) => {
        console.log('jugadores sub store');
        console.log(data);
        this.jugadores = data.items;
      });
    this.store
      .subscribe((data) => {
        console.log('all store');
        console.log(data);
      });
  }

  add(d: JugadorModel) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoJugadorAction(d));
        const myDb = db;
        myDb.jugadores.add(d);
        console.log('todos los jugadores de la db!');
        myDb.jugadores.toArray().then(jugadores => console.log(jugadores))
      }
    });
  }

  getById(id: String): JugadorModel {
    return this.jugadores.filter(function(d) { return d.id.toString() === id; })[0];
  }

  getAll(): JugadorModel[] {
    return this.jugadores;
  }

  elegir(d: JugadorModel) {
    // aqui incovariamos al servidor
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

}
