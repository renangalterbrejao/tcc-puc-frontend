import { Component } from '@angular/core';
import { LoginService } from 'src/app/components/login/login.service';

@Component({
  selector: 'app-header-buscar',
  templateUrl: './header-buscar.component.html',
  styleUrls: ['./header-buscar.component.css']
})
export class HeaderBuscarComponent {

  usuarioNome: string;

  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {

    this.usuarioNome = this.loginService.obterUsuario().nome;

  }

}
