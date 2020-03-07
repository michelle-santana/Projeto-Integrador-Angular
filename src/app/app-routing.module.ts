import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ContatoComponent } from './component/contato/contato.component';
import { QuemSomosComponent } from './component/quem-somos/quem-somos.component'

const routes: Routes = [
  { path: "", component: HomeComponent },
  {path: "home", component: HomeComponent},
  { path:"contato" , component: ContatoComponent },
  { path:"quemSomos", component: QuemSomosComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }