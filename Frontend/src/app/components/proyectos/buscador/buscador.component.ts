import { Component } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  op1_p:string="│";
  op2_p:string="│";
  op3_p:string="│";
  hay_resultados:boolean=false;
  year:number=2023;
  user_search_list:boolean=false;
  proyectos:Proyecto[]=[];
  proyectos_filtrados:Proyecto[]=[];
  proyectos_this_year:Proyecto[]=[];
  proyecto_mostrar:number=0;//0 significa que no muestra ningún proyecto

  constructor(private proyectoservice:ProyectoService){
    this.proyectoservice.getJsonData().subscribe((data)=>{
      this.proyectos=data.Proyectos;
      this.actualizar_proyecto_año();
    })
    const proyectoid = localStorage.getItem('proyecto');
    if(proyectoid!=null){
      this.proyecto_mostrar=parseInt(proyectoid);
      setTimeout(() => {
        const proyectoElement = document.getElementById("Proyecto" + proyectoid.toString());
        proyectoElement!.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
    localStorage.removeItem('proyecto');
  }

  scrollToDiv(targetDiv: HTMLElement | null) {
    if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: "smooth" });
    }
}
  
  actualizar_proyecto_año(){
    this.proyectos_this_year=this.proyectos.filter((proyecto)=>proyecto.fecha == this.year);
  }

  activarlupa(lupa_n:string){
    var lupa = document.getElementById(lupa_n);
    lupa!.classList.add("lupa_activo");
    lupa!.style.cursor="pointer";
  }
  btn_seleccion(titulo:string,id:string,opcion:string){//solucionar que aca realize el cambio del titulo
    if(opcion=="op1_p"){this.op1_p=titulo;}
    if(opcion=="op2_p"){this.op2_p=titulo;}
    if(opcion=="op3_p"){this.op3_p=titulo;}
    var elemento = document.getElementById(id);
    elemento!.style.animationDuration="0s";
  }
  limpiar_opcion(lupa_n:string,id:string){
    var lupa = document.getElementById(lupa_n);
    lupa!.classList.remove("lupa_activo");
    lupa!.style.cursor="default";
    if(lupa_n=="lupa1"){this.op1_p="│";}
    if(lupa_n=="lupa2"){this.op2_p="│";}
    if(lupa_n=="lupa3"){this.op3_p="│";}
    var elemento = document.getElementById(id);
    elemento!.style.animationDuration = "2.5s";
  }

  op1_0(){
    this.limpiar_opcion("lupa1","op1");
  }
  op1_1(categoria:string){
    this.btn_seleccion(categoria,"op1","op1_p");
    this.activarlupa("lupa1");
  }
  op2_0(){
    this.limpiar_opcion("lupa2","op2");
  }
  op2_1(año:string){
    this.btn_seleccion(año,"op2","op2_p");
    this.activarlupa("lupa2");
  }
  op3_0(){
    this.limpiar_opcion("lupa3","op3");
  }
  op3_1(concurso:string){
    this.btn_seleccion(concurso,"op3","op3_p");
    this.activarlupa("lupa3");
  }
  lastyear(){
    if(this.year>2023){//recien en este año hay proyectos
      this.year-=1;
      this.actualizar_proyecto_año();
    }
  }
  nextyear(){
    if(this.year<2024){//limitar el máximo del año actual
      this.year+=1;
      this.actualizar_proyecto_año();
    }
  }
  bus_filtro1(){
    if(this.op1_p!="│"){
      this.user_search_list=true;
      this.filtrar();
    }
  }
  bus_filtro2(){
    if(this.op2_p!="│"){
      this.user_search_list=true;
      this.filtrar();
    }
  }
  bus_filtro3(){
    if(this.op3_p!="│"){
      this.user_search_list=true;
      this.filtrar();
    }
  }
  filtrar(){
    this.proyectos_filtrados=this.proyectos;
    if(this.op1_p!="│"){
      this.proyectos_filtrados=this.proyectos_filtrados.filter((proyecto)=>proyecto.categoria == this.op1_p);
      this.hay_resultados=true;
    }
    if(this.op2_p!="│"){
      this.proyectos_filtrados=this.proyectos_filtrados.filter((proyecto)=>proyecto.fecha == parseInt(this.op2_p));
      this.hay_resultados=true;
    }
    if(this.op3_p!="│"){
      this.proyectos_filtrados=this.proyectos_filtrados.filter((proyecto)=>proyecto.concurso == this.op3_p);
      this.hay_resultados=true;
    }
    if(this.proyectos_filtrados.length==0){
      this.hay_resultados=false;
    }
  }
  aparecer_proyecto(id:number){
    this.proyecto_mostrar=id;
    setTimeout(() => {
      const proyectoElement = document.getElementById("Proyecto" + id.toString());
      proyectoElement!.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }
}
