import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AcercaDirectorioComponent } from './components/acerca-directorio/acerca-directorio.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    AcercaComponent,
    ProyectosComponent,
    NoticiasComponent,
    ContactoComponent,
    AcercaDirectorioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //JUST REMEMBER IF YOU WANT TO CHECK TYPING JUST DELETE THIS LINE BELOW AND ALSO DELETE ABOUT-DIRECTORIO HTML CODE TO CHECK WHATEVER TYPING YOU WANT. Of course after that please do ctrl+z to add what you have deleted.
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  //this schemas customs elements is needed in this project in order to work with ionicons (icons svg typing structure) - about-Directorio section in the page, but it will not show errors about typing correctly in angular.
})
export class AppModule { }
