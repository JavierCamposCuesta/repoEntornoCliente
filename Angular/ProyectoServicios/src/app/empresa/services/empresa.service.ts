import { Injectable } from "@angular/core";
import { Empleado } from "../interfaces/empleado-interface";

@Injectable() export class EmpresaService {
    constructor(){
        console.log("Servicio Empresa iniciado");
    }

    private _empleados: Empleado[]=[
        {
            nombre: "Antonio",
            sueldo: 1600
          },
          {
            nombre: "María",
            sueldo: 1500
          },
          {
            nombre: "Gustavo",
            sueldo: 1900
          }
    ];

    get empleados():Empleado[]{
        return [...this._empleados];
    }

    agregarEmpleado (empleado:Empleado){
        this._empleados.push(empleado);
    }
}