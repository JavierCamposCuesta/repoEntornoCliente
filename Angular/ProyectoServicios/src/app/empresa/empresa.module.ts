import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EmpresaService } from './services/empresa.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainPageComponent,
    EmpleadosComponent,
    AgregarComponent
  ],
  exports: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[
    EmpresaService
  ]
})
export class EmpresaModule { }
