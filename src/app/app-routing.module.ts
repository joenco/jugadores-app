import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JugadorComponent } from './components/jugador/jugador.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { FormJugadorComponent } from './components/form-jugador/form-jugador.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './components/login/login.guard';

const routes: Routes = [
  { path: '', component: JugadoresComponent},
  { path: 'agregar', component: FormJugadorComponent, canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
//    ,{ enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
