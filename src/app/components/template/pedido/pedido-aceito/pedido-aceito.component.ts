import { HeaderPedidoService } from 'src/app/components/template/pedido/header-pedido/header-pedido.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-aceito',
  templateUrl: './pedido-aceito.component.html',
  styleUrls: ['./pedido-aceito.component.css']
})
export class PedidoAceitoComponent implements OnInit {

  constructor(public headerPedidoService: HeaderPedidoService, private router: Router) {
  }

  ngOnInit(): void {
    this.headerPedidoService.setPagamentoSomenteLeitura(true);
  }

  setarNavegacao() {
    this.router.navigateByUrl('/pagamento');
  }

}
