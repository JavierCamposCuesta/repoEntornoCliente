import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../interfaces/empleado-interface';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  nuevo: Empleado={nombre:"", sueldo:0};

  constructor(private bsService:EmpresaService) { }

  agregar(){
    this.bsService.agregarEmpleado(this.nuevo);
    this.nuevo = {
      nombre: "",
      sueldo: 0
    }
  }

  ngOnInit(): void {
  }

}
