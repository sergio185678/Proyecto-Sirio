import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit{
  info : any = {
  };
  cargada = false;
  itemsToShow = 3;
  constructor(private http: HttpClient) {
    console.log("Todo okay")
    http.get("../../assets/noticias_list.json")
      .subscribe( data => {
        this.info = data;
        this.cargada = true;
      });
  }
  ngOnInit() {
  }



  loadMore(){
    this.itemsToShow += 3;
    const button = document.querySelector('.verMas');
    if (button) {
      button.remove();
    }
    const elemento = document.getElementById('2');
    if (elemento) {
      elemento.classList.remove('inv');
    }
  }


}
