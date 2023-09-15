import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-directorio',
  templateUrl: './acerca-directorio.component.html',
  styleUrls: ['./acerca-directorio.component.css']
})
export class AcercaDirectorioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let menuToggle = document.querySelector('.toggle');
    let animation = document.querySelector('.animation');
    let menu = document.querySelector('.menu');
    menuToggle?.addEventListener('click', () => {
      menu?.classList?.toggle('active');
      menuToggle?.classList?.toggle('active');
      animation?.classList?.toggle('noDisplay');
    });
  }
}
