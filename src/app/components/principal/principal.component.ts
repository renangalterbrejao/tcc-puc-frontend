import { HeaderPedidoService } from 'src/app/components/template/pedido/header-pedido/header-pedido.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  constructor(public headerPedidoService: HeaderPedidoService) {
  }

  ngOnInit(): void {
    this.headerPedidoService.setPagamentoSomenteLeitura(false);
  }

}
