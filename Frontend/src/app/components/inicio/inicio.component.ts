import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  ngOnInit(): void {
    var screenHeight: number = window.innerHeight;
    var screenWidth: number = window.innerWidth;
    if(screenWidth>800){
      this.altura_parteinicial(screenHeight);
    }
    this.altura_proy_1();

    window.addEventListener('resize', this.handleResize);
  }

  altura_parteinicial(screenHeight:number):void {
    var navbarrr = document.getElementById('navbar');
    var altura1 = navbarrr!.clientHeight;
    var parte1 = document.getElementById('parte1');
    var altura2 = parte1!.clientHeight;
    var parte1_h1 = document.getElementById('part1_h1');
    
    parte1_h1!.style.marginTop = (screenHeight-altura1-altura2).toString()+"px";
  }

  altura_proy_1():void{
    var fondo_proy1=document.getElementById('proy1');
    var altura1=fondo_proy1!.clientHeight;
    var textooo1=document.getElementById('textooo1');
    var altura2=textooo1!.clientHeight;

    textooo1!.style.marginTop = (altura1-altura2).toString()+"px";
  }

  handleResize(): void {
    window.location.reload();
  }
}
