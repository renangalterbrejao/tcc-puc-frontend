import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VariaveisGlobais } from './variaveisGlobais';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private title: Title) {
  }

  ngOnInit() {
    //this.title.setTitle(VariaveisGlobais.tituloApp);
  }
}
