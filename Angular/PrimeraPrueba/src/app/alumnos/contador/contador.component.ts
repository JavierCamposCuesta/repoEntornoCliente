import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {
  
  contador:number = 1;
  acumula(incremento: number){
    this.contador += incremento;
  }
 
  resetearContador(){
    this.contador=0;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
