import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Usuario } from "./usuario.model";
import { BuscaService } from '../template/buscar/busca.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private buscaService: BuscaService
  ) { }

  public email = new FormControl('avaliadortccamericana@gmail.com', [
    Validators.required,
    Validators.email
  ]);

  public senha: any = '';
  public botaoHabilitado: boolean = false;
  public usuario: Usuario;

  ngOnInit(): void {
    this.loginService.setUsuarioAutenticado(false);
    this.buscaService.apagarEstabelecimentosPossiveis();
  }

  logar() {
    let modalLogin = document.querySelector('#modalAtencao') as HTMLLIElement;

    if ((this.email.errors || this.email.value == '') || (this.senha === '')) {

      modalLogin.style.display = 'flex';

    } else {

      this.loginService.read(this.email.value, this.senha).subscribe(usuario => {

        this.usuario = usuario;

        this.loginService.salvarUsuario(this.usuario);
        this.loginService.setUsuarioAutenticado(true);
        this.router.navigateByUrl("/principal");

      })
    }

  }
  escondeMostraSenha() {
    let campoSenha = document.querySelector('#login-mobile-senha') as HTMLLIElement;

    if (campoSenha.getAttribute('type') === 'password') {
      campoSenha.setAttribute('type', 'text');
    } else {
      campoSenha.setAttribute('type', 'password');
    }
  }

  limpaCampos() {
    this.email.setValue('');
    this.senha = '';
  }

}
