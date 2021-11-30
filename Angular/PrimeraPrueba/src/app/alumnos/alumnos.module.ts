import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlumnoComponent } from "./alumno/alumno.component";
import { ContadorComponent } from "./contador/contador.component";

@NgModule({
    declarations: [
        AlumnoComponent,
        ContadorComponent
    ],
    exports: [
        AlumnoComponent,
        ContadorComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AlumnosModule {
    
 }