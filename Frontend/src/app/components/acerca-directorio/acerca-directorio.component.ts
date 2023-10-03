import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-acerca-directorio',
  templateUrl: './acerca-directorio.component.html',
  styleUrls: ['./acerca-directorio.component.css']
})
export class AcercaDirectorioComponent implements OnInit {
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
        console.log(this.areas);
        console.log(this.areasNames);
      });
    }
    chooseColor(color: string, colors: string[]): void {
      this.colors = this.colorsUsed.map((usedColor) => usedColor === color ? usedColor : '#060A12');
    }

    clearColors(): void {
      this.calculateDrawingPizzaColor('transparent');
    }

    calculateDrawingPizzaColor(colorChosen: string='transparent'): void {
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
        this.clearColors();// Reset to default (e.g., transparent)
        this.highlightedColor = null;
      }
    }
}
