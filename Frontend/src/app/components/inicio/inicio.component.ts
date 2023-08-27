import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  frase:string="";
  constructor(private router: Router) {
    const frasesEspacio = [
      "“El hombre no puede vivir sin tratar de escribir y explicar el universo.“ - Isasia Berlin",
      "“El cosmos es todo lo que es, o alguna vez fue, o alguna vez será.“ - Carl Sagan",
      "“Dos cosas son infinitas: el universo y la estupidez humana; y yo no estoy seguro sobre el universo.“ - Albert Einstein",
      "“La exploración del espacio será para beneficio de toda la humanidad.“ - Yuri Gagarin",
      "“En algún lugar, algo increíble está esperando ser descubierto.“ - Carl Sagan",
      "“Para mí, el cielo es mejor que cualquier cuadro.“ - Vincent van Gogh",
      "“La Tierra es el cuna de la humanidad, pero uno no puede quedarse en la cuna para siempre.“ - Konstantin Tsiolkovsky",
      "“El universo no solo es más extraño de lo que imaginamos, sino más extraño de lo que podemos imaginar.“ - Sir Arthur Eddington",
      "“Cuando miras las estrellas y el infinito universo, te das cuenta de cuán pequeño eres en la vastedad del cosmos.“ - Maxime Lagacé",
      "“Explorar el espacio le cambia la vida a uno, y eso es algo bueno para todos.“ - Sally Ride",
      "“El espacio es el arte de Dios.“ - Thomas Browne"
    ];
    this.frase=frasesEspacio[Math.floor(Math.random() * frasesEspacio.length)];
  }
  ngOnInit(): void {
    var screenHeight: number = window.innerHeight;
    var screenWidth: number = window.innerWidth;
    if(screenWidth>800){
      this.altura_parteinicial(screenHeight);
    }

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

  handleResize(): void {
    window.location.reload();
  }

  abrir_proyecto(id_proyecto:number){
    this.router.navigate(['/Proyectos']);
    localStorage.setItem('proyecto', id_proyecto.toString());
  }

  abrir_proyectos(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/Proyectos']);
  }
}
