import { Component, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/brawl-starts-interface';
import { BrawlStarsService } from '../services/brawl-stars.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  
  // personajes: Personaje[] = [];

  nuevo: Personaje={
    nombre: "Bull",
    salud: 5200
  }

  // constructor(private bsService:BrawlStarsService) { 
  //   this.personajes = this.bsService.personajes;
  // }

  
  // agregarNuevoPersonaje(personaje: Personaje){
  //   this.personajes.push(personaje);
  // }

  ngOnInit(): void {
  }

  
  

}
