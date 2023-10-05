import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
@Component({
  selector: 'app-acerca-directorio',
  templateUrl: './acerca-directorio.component.html',
  styleUrls: ['./acerca-directorio.component.css']
})
export class AcercaDirectorioComponent implements OnInit {
    firstTimeAnimated: boolean = true;
    selectedArea: string | null = null; // Variable to store the selected area
    areas: { [key: string]: Area } = {};
    areasNames?: string[];
    numColors: number = 8;
    colorsUsed: string[] = ['#0019FD', '#DE0D98', '#DEC800', '#2AC11D', '#03C1F5', '#1B1B1A', '#1B1B1B', '#1B1B1C'];
    colors: string[] = this.colorsUsed;
    highlightedColor: string | null = null;

    constructor(private areaService: AreaService) { }

    ngOnInit(): void {
      let menuToggle = document.querySelector('.toggle');
      let animation = document.querySelector('.animation-rows');
      let menu = document.querySelector('.AreasMenu');
      let container = document.querySelector('.container-box');

      menuToggle?.addEventListener('click', () => {
        menu?.classList?.toggle('active');
        animation?.classList?.toggle('noDisplay');
        menuToggle?.classList?.toggle('active');
        container?.classList?.toggle('active');
        container?.classList?.toggle('inactive');
        this.calculateDrawingPizzaColor();
      });

      this.areaService.getData().subscribe((result) => {
        this.areas = result;
        this.areasNames = Object.keys(this.areas);
      });
    }

    chooseColor(color: string, colors: string[]): void {
      this.colors = this.colorsUsed.map((usedColor) => usedColor === color ? usedColor : '#060A12');
    }

    clearColors(): void {
      this.calculateDrawingPizzaColor('transparent');
    }

    calculateDrawingPizzaColor(colorChosen: string = 'transparent'): void {
      this.chooseColor(colorChosen, this.colors);
      let colorStops = '';
      let angleStep = 360 / this.numColors;
      angleStep = (angleStep / 360) * 100 / 2;
      let currentAngle = 0;
      for (let i = 0; i < this.numColors * 2; i++) {
        const color = this.colors[Math.floor(i !== 0 ? (i + 1) / 2 : i) % this.colors.length];
        const start = currentAngle;
        currentAngle += angleStep;
        const end = currentAngle;
        colorStops += `${color} ${start}% ${end}%`;
        if (i !== this.numColors * 2 - 1) {
          colorStops += ', ';
        }
      }
      document.documentElement.style.setProperty('--color-stops', colorStops);
    }

    highlightSection(color: string): void {
      this.calculateDrawingPizzaColor(color);
      this.highlightedColor = color;
    }

    clearHighlight(): void {
      if (this.highlightedColor) {
        this.clearColors();
        this.highlightedColor = null;
      }
    }
    selectedSnowColor(areaName: string): void {
      this.selectedArea = areaName;
      let colorSelected = '#1B1B1B';
      if (this.selectedArea == 'Desarrollo Web'){
        colorSelected = '#001133';
      }else if (this.selectedArea == 'Diseño y Publicidad'){
        colorSelected = '#09003E';
      }
      document.documentElement.style.setProperty('--areaSnowColor', colorSelected);
    }
    showArea(areaName: string): void {
      this.selectedSnowColor(areaName);

      setTimeout(() => {
        const areaElement = document.getElementById(areaName);
        areaElement!.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }

    removeAnimaElements(items: string, animation: string): void{
      const animatedElements = document.getElementsByClassName(items);

      for (let i = 0; i < animatedElements.length; i++) {
        animatedElements[i].classList.remove(animation);
      }
    }

    removeAnimaElement(item: string, animation: string): void{
      const animatedElement = document.getElementById(item);
        animatedElement?.classList.remove(animation);
    }

    removeAnimation(): void {
      setTimeout(() => {
        this.removeAnimaElement('selectedArea_De','animated');
        this.removeAnimaElement('selectedArea_Title','animated');
        this.removeAnimaElements('DirSub_svgPart','animated');
        this.removeAnimaElements('DirSub_svgPart_Nombre','animated');
        this.removeAnimaElements('DirSub_svgPart_RolCarrera','animated');
        this.removeAnimaElements('DirSub_svgPart_Descripcion','animated');
        this.removeAnimaElements('DirSub_iconPartIMG','animated');
        this.addAnimaElements('DirSub_iconPartIMG','animatedIcon');
        this.removeAnimaElements('DirSub_PhotoPartIMG','animated');
        this.removeAnimaElements('social_media','animated');
      }, 2600);
      this.firstTimeAnimated = false;
    }

    addAnimaElement(item: string, animation: string): void {
      const animatedElement = document.getElementById(item);
      animatedElement?.classList.add(animation);
    }

    addAnimaElements(items: string, animation: string):void{
      const animatedElements = document.getElementsByClassName(items);

      for (let i = 0; i < animatedElements.length; i++) {
        animatedElements[i].classList.add(animation);
      }
    }
    addAnimation(): void {
      if (!this.firstTimeAnimated){
        this.addAnimaElement('selectedArea_De','animated');
        this.addAnimaElement('selectedArea_Title','animated');
        this.addAnimaElements('DirSub_svgPart','animated');
        this.addAnimaElements('DirSub_svgPart_Nombre','animated');
        this.addAnimaElements('DirSub_svgPart_RolCarrera','animated');
        this.addAnimaElements('DirSub_svgPart_Descripcion','animated');
        this.addAnimaElements('DirSub_iconPartIMG','animated');
        this.removeAnimaElements('DirSub_iconPartIMG','animatedIcon');
        this.addAnimaElements('DirSub_PhotoPartIMG','animated');
        this.addAnimaElements('social_media','animated');
      }
    }
}
