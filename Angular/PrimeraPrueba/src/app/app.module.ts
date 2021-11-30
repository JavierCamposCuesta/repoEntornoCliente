import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AlumnosModule } from './alumnos/alumnos.module';
import { BrawlStartsModule } from './brawl-starts/brawl-starts.module';








@NgModule({
  declarations: [
    AppComponent
    

    
  ],
  imports: [
    BrowserModule
    ,FormsModule,
    AlumnosModule,
    BrawlStartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
