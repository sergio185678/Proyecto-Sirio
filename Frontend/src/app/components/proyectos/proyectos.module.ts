import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { BuscadorComponent } from './buscador/buscador.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { Proyecto1Component } from './proyecto1/proyecto1.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  declarations: [
    BuscadorComponent,
    ProjectHomeComponent,
    Proyecto1Component,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule
  ]
})
export class ProyectosModule { }
