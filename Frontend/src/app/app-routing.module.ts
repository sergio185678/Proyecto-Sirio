import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  {path:'',redirectTo:'/Inicio',pathMatch:'full'},
  {path:'Inicio',component:InicioComponent},
  {path:'Acerca',component:AcercaComponent},
  {path:'Proyectos',component:ProyectosComponent,
  loadChildren:()=>import('../app/components/proyectos/proyectos.module').then(x=>x.ProyectosModule)},
  {path:'Noticias',component:NoticiasComponent},
  {path:'Contacto',component:ContactoComponent},
  {path:'**',redirectTo:'/Inicio',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
