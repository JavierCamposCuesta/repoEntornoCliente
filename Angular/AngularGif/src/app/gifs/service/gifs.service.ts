import { Injectable } from "@angular/core";

@Injectable() export class GifsService{

    private _historial:string[]=[];

    
    // get historial() devuelve la propiedad privada historial que será un array de strings

    get historial():string[]{
        return [...this._historial];
    }

    // buscarGifs ( query: string) recibe un string y lo añade al 
    // principio del array historial.

    buscarGifs(string:string){
    if(!this._historial.includes(string)){
        
        if(this._historial.length>=10){
            this._historial.unshift(string);
            this._historial.pop();
        }
        else{
         this._historial.unshift(string);
        }
    }
       
    }


}