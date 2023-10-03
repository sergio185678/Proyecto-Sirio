import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area'; // Area Model :D

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(private http: HttpClient) {}

  getData(): Observable<{[key:string]:Area}> {
    return this.http.get<{[key:string]:Area}>('../../assets/acercaDe.json'); // Area as Item :3
  }
}
