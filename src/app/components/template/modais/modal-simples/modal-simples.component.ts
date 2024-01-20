import { Component, Injectable, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-simples',
  templateUrl: './modal-simples.component.html',
  styleUrls: ['./modal-simples.component.css']
})
@Injectable({ providedIn: 'root' })
export class ModalSimplesComponent implements OnInit {

  @Input() idModal: string;
  @Input() titulo: string;
  @Input() corpo: string;

  public id: string;
  public tituloModal: string;
  public corpoMensagem: string;

  ngOnInit(): void {

    this.id = this.idModal
    this.tituloModal = this.titulo
    this.corpoMensagem = this.corpo

  }

  public toggleModalAlerta() {
    let modalLogin = document.getElementById(this.id);

    if (modalLogin != null) {
      modalLogin.style.display = 'none';
    }
  }
}
