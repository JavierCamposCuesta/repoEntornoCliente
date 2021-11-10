import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string  = 'PrimeraPrueba';
  nombre: string = 'Javier Campos Cuesta';
  edad: number = 23;
  email: string = "javiercamposcuesta@gmail.com";
  sueldos:Array<number> = [1300, 1600, 2000];
  activo:boolean = true;
  contador:number = 1;
  nombreInput:string="";
  apellidoInput:string="";

 esActivo(){
   if(this.activo){
     return "Trabajador activo";
   }
   else{
     return "Trabajador no activo";
   }
 }

 ultimosSueldos(){
   let suma = 0;
   for (let i = 0; i< this.sueldos.length; i++) {
   suma += this.sueldos[i];
   }
   return suma;
 }

 incrementar(){
   this.contador++;
 }

 decrementar(){
   this.contador--;
 }

}
