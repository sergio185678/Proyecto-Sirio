import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  correo = {
    name: '',
    email:'',
    message: ""
  };

  constructor(private http: HttpClient) {}

  enviarCorreo() {
    if (!this.isEmailValid()) {
      this.clearEmailField();
      window.alert("El correo electrónico no es válido. Por favor, ingréselo correctamente.");
      return;
    }else{
      this.http.post('https://formcarry.com/s/IZxYOVynAG',  this.correo)
        .subscribe(
          response => {
            console.log('Respuesta de la llamada AJAX:', response);
            window.alert("Se ha realizado el envio correctamente");
          },
          error => {
            console.error('Error en la llamada AJAX:', error);
          }
        );

      this.clearAllFields();
    }

  }
  isEmailValid(): boolean {
    return this.correo.email.includes("@") && this.correo.email.includes(".");
  }

  clearEmailField() {
    this.correo.email = "";
  }
  clearAllFields(){
    this.correo.name = "";
    this.correo.email = "";
    this.correo.message = "";
  }
}
