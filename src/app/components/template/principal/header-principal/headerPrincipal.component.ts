import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/components/principal/principal.service';
import { LoginService } from '../../../login/login.service';
import { Usuario } from 'src/app/components/login/usuario.model';

@Component({
  selector: 'app-header-Principal',
  templateUrl: './header-Principal.component.html',
  styleUrls: ['./header-Principal.component.css']
})
export class HeaderPrincipalComponent implements OnInit {

  private principalServiceClasse: any;
  usuarioNome: string;

  constructor(private principalService: PrincipalService, private loginService: LoginService) {
    this.principalServiceClasse = principalService;
  }

  ngOnInit(): void {
    if (this.loginService.obterUsuario() != undefined && this.loginService.obterUsuario() != null) {
      //this.usuarioNome = this.loginService.obterUsuario().nome.substring(0, 5);
      /*const [, match] = this.loginService.obterUsuario().nome.match(/(\S+) /) || [];
      this.usuarioNome = match;*/
      this.usuarioNome = this.loginService.obterUsuario().nome;
    }
  }

  selecionarMenu(id: string) {
    this.principalServiceClasse.selecionarMenu(id);
  }

}
