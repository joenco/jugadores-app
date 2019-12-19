import {v4 as uuid} from 'uuid';

export class JugadorModel {
  selected: boolean;
  habilidades: string[];
  id = uuid();
  public votes = 0;
  constructor(public nombre: string, public apellido: string, public imagen: string, public pais: string, public posicion: string, public nroCamiseta: string) {
    this.habilidades = ['Velocidad', 'Intuitivo'];
  }

  toString(): string {
    return this.nombre+" "+this.apellido; 
  }

  setSelected(s: boolean) {
    this.selected = s;
  }

  isSelected() {
    return this.selected;
  }

  voteUp(): any {
    this.votes++;
  }

  voteDown(): any {
    this.votes--;
  }

}
