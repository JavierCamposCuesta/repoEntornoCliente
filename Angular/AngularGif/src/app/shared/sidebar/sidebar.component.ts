import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private gs:GifsService) { }

  get mostrar(): string[]{
   return this.gs.historial;
  }

  ngOnInit(): void {
  }

}
