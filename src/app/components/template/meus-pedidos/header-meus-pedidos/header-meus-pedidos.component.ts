import { Component, OnInit } from '@angular/core';
import { MeusPedidoService } from '../meus-pedidos.service';

@Component({
  selector: 'app-header-meus-pedidos',
  templateUrl: './header-meus-pedidos.component.html',
  styleUrls: ['./header-meus-pedidos.component.css']
})
export class HeaderMeusPedidosComponent implements OnInit {

  rotaAnterior: string;

  constructor(private meusPedidosService: MeusPedidoService) { }

  ngOnInit(): void {
    this.rotaAnterior = this.meusPedidosService.getHeaderPedido;
  }
}
