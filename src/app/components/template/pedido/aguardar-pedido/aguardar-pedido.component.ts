import { Component, OnInit } from '@angular/core';
import { PagamentoService } from '../pagamento.service';
import { Router } from '@angular/router';
import { Estabelecimento } from '../../principal/main-principal/main-principal.model';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-aguardar-pedido',
  templateUrl: './aguardar-pedido.component.html',
  styleUrls: ['./aguardar-pedido.component.css']
})
export class AguardarPedidoComponent implements OnInit {

  estabelecimentoEscolhido: Estabelecimento;

  constructor(private pagamentoService: PagamentoService, private router: Router, private pedidoService: PedidoService) {
    this.confirmarPedido();
  }

  ngOnInit(): void {
    this.estabelecimentoEscolhido = this.pedidoService.obterEstabelecimentoEscolhido();
  }

  confirmarPedido() {
    this.pagamentoService.confirmaPedido().subscribe((pagamentoResposta) => {
      this.router.navigate(['/pedido_aceito']);
    })
  }

}
