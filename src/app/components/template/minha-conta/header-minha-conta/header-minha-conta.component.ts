import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/components/login/login.service';

@Component({
  selector: 'app-header-minha-conta',
  templateUrl: './header-minha-conta.component.html',
  styleUrls: ['./header-minha-conta.component.css']
})
export class HeaderMinhaContaComponent implements OnInit {

  usuarioNome: string;

  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {

    this.usuarioNome = this.loginService.obterUsuario().nome;

  }

}
