import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JugadorModel } from './jugador.model';
import { JugadoresApiClient } from './jugadores-api-client.model';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

// ESTADO
export interface JugadoresState {
    items: JugadorModel[];
    loading: boolean;
    favorito: JugadorModel;
}

export function intializeJugadoresState() {
  return {
    items: [],
    loading: false,
    favorito: null
  };
}

// ACCIONES
export enum JugadoresActionTypes {
  NUEVO_JUGADOR = '[Jugadores] Nuevo',
  ELEGIDO_FAVORITO = '[Jugadores] Favorito',
  VOTE_UP = '[Jugadores] Vote Up',
  VOTE_DOWN = '[Jugadores] Vote Down',
  INIT_MY_DATA = '[Jugadores] Init My Data'
}

export class NuevoJugadorAction implements Action {
  type = JugadoresActionTypes.NUEVO_JUGADOR;
  constructor(public jugador: JugadorModel) {}
}

export class ElegidoFavoritoAction implements Action {
  type = JugadoresActionTypes.ELEGIDO_FAVORITO;
  constructor(public jugador: JugadorModel) {}
}

export class VoteUpAction implements Action {
  type = JugadoresActionTypes.VOTE_UP;
  constructor(public jugador: JugadorModel) {}
}

export class VoteDownAction implements Action {
  type = JugadoresActionTypes.VOTE_DOWN;
  constructor(public jugador: JugadorModel) {}
}

export class InitMyDataAction implements Action {
  type = JugadoresActionTypes.INIT_MY_DATA;
  constructor(public jugadores: string[]) {}
}

export type JugadoresActions = NuevoJugadorAction | ElegidoFavoritoAction
  | VoteUpAction | VoteDownAction | InitMyDataAction;

// REDUCERS
export function reducerJugadores(
  state: JugadoresState,
  action: JugadoresActions
): JugadoresState {
  switch (action.type) {
    case JugadoresActionTypes.INIT_MY_DATA: {
      const jugadores: string[] = (action as InitMyDataAction).jugadores;
      return {
          ...state,
          items: jugadores.map((d) => new JugadorModel(d, '', '', '', '', ''))
        };
    }
    case JugadoresActionTypes.NUEVO_JUGADOR: {
      return {
          ...state,
          items: [...state.items, (action as NuevoJugadorAction).jugador ]
        };
    }
    case JugadoresActionTypes.ELEGIDO_FAVORITO: {
        state.items.forEach(x => x.setSelected(false));
        const fav: JugadorModel = (action as ElegidoFavoritoAction).jugador;
        fav.setSelected(true);
        return {
          ...state,
          favorito: fav
        };
    }
    case JugadoresActionTypes.VOTE_UP: {
        const d: JugadorModel = (action as VoteUpAction).jugador;
        d.voteUp();
        return { ...state };
    }
    case JugadoresActionTypes.VOTE_DOWN: {
        const d: JugadorModel = (action as VoteDownAction).jugador;
        d.voteDown();
        return { ...state };
    }
  }
  return state;
}

// EFFECTS
@Injectable()
export class JugadoresEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(JugadoresActionTypes.NUEVO_JUGADOR),
    map((action: NuevoJugadorAction) => new ElegidoFavoritoAction(action.jugador))
  );

  constructor(private actions$: Actions) {}

}
