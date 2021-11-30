import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Personaje } from '../interfaces/brawl-starts-interface';
import { BrawlStarsService } from '../services/brawl-stars.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./../main-page/main-page.component.css']
})
export class AgregarComponent implements OnInit {
  @Input() personajes: Personaje[]=[];
  @Input() nuevo: Personaje={nombre:"Bull",salud:0};
  constructor(private bsService:BrawlStarsService) { }
  
// @Output() onNewCharacter: EventEmitter<Personaje> = new EventEmitter();

  agregar(){

    // this.onNewCharacter.emit(this.nuevo);
    //this.personajes.push(this.nuevo)

    this.bsService.agregarPersonaje(this.nuevo);
    this.nuevo = {
      nombre: "",
      salud: 0
  }
}

  ngOnInit(): void {
  }

}
