import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/brawl-starts-interface";

@Injectable() export class BrawlStarsService {
    constructor(){
        console.log("sevicio BrawlStars iniciado");
    }

    private _personajes:Personaje[]=[
        {
          nombre: "Shelly",
          salud: 3600
        },
        {
          nombre: "Nita",
          salud: 3800
        },
        {
          nombre: "Colt",
          salud: 2800
        }
      ];

      get personajes():Personaje[]{
        //   Podriamos devolver el array pero no lo hacemos porque se pasaria poir referencia
        //   return this.personajes;

        //Esto le pasa otro array igual que el anterior, como un clon
        return [...this._personajes];
      }

      //Añadir un metodo que añade un personaje al array
      agregarPersonaje (personaje:Personaje){
          this._personajes.push(personaje);
      }
}