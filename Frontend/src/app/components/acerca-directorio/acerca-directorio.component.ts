import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Area, Integrante } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-acerca-directorio',
  templateUrl: './acerca-directorio.component.html',
  styleUrls: ['./acerca-directorio.component.css']
})
export class AcercaDirectorioComponent implements OnInit {
    infoMembers: { [key: string]: any } = {};
    charge= false;
    memberPairs: any[][] = [];
    memberCount: number = 0;
    studentGroups: Integrante[][] = [];
    firstTimeAnimated: boolean = true;
    selectedArea: string | null = null; // Variable to store the selected area
    areas: { [key: string]: Area } = {};
    areasNames?: string[];
    numColors: number = 8;
    colorsUsed: string[] = ['#0019FD', '#DE0D98', '#DEC800', '#2AC11D', '#03C1F5', '#1B1B1A', '#1B1B1B', '#1B1B1C'];
    colors: string[] = this.colorsUsed;
    highlightedColor: string | null = null;
    // variables for bubbles in area selected
    bubbleCount = 0;
    maxBubbles = 120; // Adjust the maximum number of bubbles as needed
    intervalId: any;

    @ViewChild('AreaSelected', { static: false }) AreaSelected!: ElementRef;
    constructor(private areaService: AreaService, private renderer: Renderer2, private http: HttpClient) {
      http.get("../../assets/acercaDeDirectorio.json")
        .subscribe( data => {
          this.infoMembers = data;
          this.charge = true;
          this.infoMembers = this.infoMembers["membersData"]
          this.memberCount = Object.keys(this.infoMembers).length;
          this.memberPairs = this.chunkArray(Object.values(this.infoMembers), 2);
        });
    }
    chunkArray(arr: any[], chunkSize: number) {
      const result = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
      }
      return result;
    }

    toggleMenu(): void {
      let menuToggle = document.querySelector('.toggle');
      let animation = document.querySelector('.animationRows');
      let circularMenu = document.querySelector('.CircularAreasMenu');
      let container = document.querySelector('.backgroundCircle');

      if (menuToggle && circularMenu && animation && container) {
          menuToggle?.addEventListener('click', () => {
          circularMenu?.classList?.toggle('active');
          animation?.classList?.toggle('noDisplay');
          menuToggle?.classList?.toggle('active');
          container?.classList?.toggle('active');
          container?.classList?.toggle('inactive');
          this.calculateDrawingPizzaColor();
        });
      }
    }

    fetchData(): void {
      this.areaService.getData().subscribe((result) => {
        this.areas = result;
        this.areasNames = Object.keys(this.areas);
      });
    }

    chooseColor(color: string): void {
      this.colors = this.colorsUsed.map((usedColor) => usedColor === color ? usedColor : '#060A12');
    }

    clearColors(): void {
      this.calculateDrawingPizzaColor('#060A12');
    }

    calculateDrawingPizzaColor(colorChosen: string = '#060A12'): void {
      this.chooseColor(colorChosen);
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

    selectedBubblesColor(): void {
      let colorSelected = '#1B1B1B';
      if (this.selectedArea == 'Desarrollo Web'){
        colorSelected = '#006eff';
      }else if (this.selectedArea == 'Diseño y Publicidad'){
        colorSelected = '#09003E';
      }
      document.documentElement.style.setProperty('--areaBubbleColor', colorSelected);
    }
    createStar(): void{
      if (this.AreaSelected) {
        const selectedAreaDiv = this.AreaSelected.nativeElement;
        const createElement = this.renderer.createElement('span');
        const starSize = 2; // Tamaño de las estrellas

        const maxWidth = selectedAreaDiv.offsetWidth - starSize; // Restamos el tamaño de las estrellas
        const maxHeight = selectedAreaDiv.offsetHeight - starSize; // Restamos el tamaño de las estrellas

        this.renderer.setStyle(createElement, 'width', starSize + 'px');
        this.renderer.setStyle(createElement, 'height', starSize + 'px');
        this.renderer.setStyle(createElement, 'left', Math.random() * maxWidth + 'px');
        this.renderer.setStyle(createElement, 'top', Math.random() * maxHeight + 'px');
        this.renderer.setStyle(createElement, 'position', 'absolute'); // Cambiado a 'absolute'
        this.renderer.addClass(createElement,'star');

        this.renderer.appendChild(selectedAreaDiv, createElement);

        setTimeout(() => {
          this.renderer.removeChild(selectedAreaDiv, createElement);
        }, 4000);
      }
    }
    smoothScroll(): void{
      const areaElement = document.getElementById('AreaSelected');
      areaElement!.scrollIntoView({ behavior: "smooth" });
    }
    createStarsBackground(){
      this.createStar();
      setInterval(() => {
        this.createStar();
      }, 50);
    }

    ngOnInit(): void {
      this.toggleMenu();
      this.fetchData();
    }
    showArea(areaName: string): void {
      this.selectedArea = areaName;
      this.selectedBubblesColor();
      setTimeout(() => {
        this.smoothScroll();
        this.createStarsBackground();
        this.bubbleCount = 0;
        this.intervalId = (setInterval(() => this.createBubbles(), 0.1));
        this.studentGroups = this.chunkArray(Object.values(this.areas[areaName].Integrantes || []),2);
      }, 10);
    }

    createBubbles() {
      const selectedAreaDiv = this.AreaSelected.nativeElement;
      const createElement = this.renderer.createElement('span');
      const size = Math.random() * 60;

      const width = size + 20; const height = size + 20;

      this.renderer.setStyle(createElement, 'width', width +'px');
      this.renderer.setStyle(createElement, 'height', height +'px');
      this.renderer.setStyle(createElement, 'left', Math.random() * window.innerWidth - width+ 'px');
      this.renderer.addClass(createElement, 'bubble');
      this.renderer.appendChild(selectedAreaDiv, createElement);

      setTimeout(() => {
        this.renderer.removeChild(selectedAreaDiv, createElement);
      }, 2000);

      this.bubbleCount++;

      if (this.bubbleCount >= this.maxBubbles && this.intervalId) {
        clearInterval(this.intervalId);
      }
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
        this.removeAnimaElement('AreaSelected_De','animated');
        this.removeAnimaElement('AreaSelected_Title','animated');
        this.removeAnimaElements('svgPart','animated');
        this.removeAnimaElements('Nombre','animated');
        this.removeAnimaElements('RolCarrera','animated');
        this.removeAnimaElements('Descripcion','animated');
        this.removeAnimaElements('DirSub_iconPartIMG','animated');
        this.addAnimaElements('DirSub_iconPartIMG','animatedIcon');
        this.removeAnimaElements('DirSub_PhotoPartIMG','animated');
        this.removeAnimaElements('socialMedia','animated');
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
        this.addAnimaElement('AreaSelected_De','animated');
        this.addAnimaElement('AreaSelected_Title','animated');
        this.addAnimaElements('svgPart','animated');
        this.addAnimaElements('Nombre','animated');
        this.addAnimaElements('RolCarrera','animated');
        this.addAnimaElements('Descripcion','animated');
        this.addAnimaElements('DirSub_iconPartIMG','animated');
        this.removeAnimaElements('DirSub_iconPartIMG','animatedIcon');
        this.addAnimaElements('DirSub_PhotoPartIMG','animated');
        this.addAnimaElements('socialMedia','animated');
      }
    }
}
