import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit{
  info : any = {
  };

  cargada = false;
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

}
