import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  
  alumnos:Array<string>=["javier", "manolo","antonio", "gustavo"];
  eliminados:string[] =[];
  
  eliminar():void{
    this.eliminados.push(this.alumnos.pop() || "");
  }

  addAlumnos():void{
    this.alumnos.push(this.eliminados.pop() || "");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
