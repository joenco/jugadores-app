import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { JugadorModel } from '../../models/jugador.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { VoteUpAction, VoteDownAction } from '../../models/jugadores-state.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})
export class JugadorComponent implements OnInit {
  @Input() jugador: JugadorModel;
  @Input("idx") position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() onClicked: EventEmitter<JugadorModel>;

  constructor(private store: Store<AppState>) {
    this.onClicked = new EventEmitter();
  }

  ngOnInit() {
  }

  ir() {
    this.onClicked.emit(this.jugador);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.jugador));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.jugador));
    return false;
  }

}
