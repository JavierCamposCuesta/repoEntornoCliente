import { Component, OnInit } from '@angular/core';
import { Empleado } from '../interfaces/empleado-interface';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  get empleados():Empleado[]{
    return this.bsService.empleados;
  }
  constructor(private bsService:EmpresaService) { }

  ngOnInit(): void {
  }

}
