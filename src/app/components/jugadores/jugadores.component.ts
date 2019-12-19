import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { JugadorModel } from '../../models/jugador.model';
import { JugadoresApiClient } from '../../models/jugadores-api-client.model';
import { Store } from '@ngrx/store';
import { AppState} from '../../app.module';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers: [ JugadoresApiClient ]
})
export class JugadoresComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<JugadorModel>;
  updates:string[];

  constructor(
      private jugadoresApiClient: JugadoresApiClient,
      private store: Store<AppState>
    ) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
  }

  ngOnInit() {
    this.store.select(state => state.jugadores.favorito)
      .subscribe(data => {
        const f = data;
        if (f != null) {
          this.updates.push('Se eligió: ' + f.nombre);
        }
      });
  }

  agregado(d:JugadorModel) {
    this.jugadoresApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d:JugadorModel) {
    this.jugadoresApiClient.elegir(d);
  }

}
