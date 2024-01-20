import { HeaderPedidoService } from './header-pedido.service';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../pedido/pedido.service';
import { Estabelecimento } from '../../principal/main-principal/main-principal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-pedido',
  templateUrl: './header-pedido.component.html',
  styleUrls: ['./header-pedido.component.css']
})
export class HeaderPedidoComponent implements OnInit {

  public rotaAnterior: string;
  public pagamentoSomenteLeitura: boolean = false;
  estabelecimentoEscolhido: Estabelecimento;

  constructor(private headerPedidoService: HeaderPedidoService, private pedidoService: PedidoService,
    private router: Router) { }

  ngOnInit(): void {
    this.rotaAnterior = this.getRotaAnterior;
    this.pagamentoSomenteLeitura = this.headerPedidoService.getPagamentoSomenteLeitura
    this.estabelecimentoEscolhido = this.pedidoService.obterEstabelecimentoEscolhido();

    if (this.estabelecimentoEscolhido == undefined || this.estabelecimentoEscolhido == null) {
      this.router.navigateByUrl('/principal');
    }
  }

  get getRotaAnterior(): string {
    return this.headerPedidoService.getHeaderPedido
  }

}
