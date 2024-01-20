import { HeaderPedidoService } from 'src/app/components/template/pedido/header-pedido/header-pedido.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './produto.service';
import { Item } from '../item.model'
import { PedidoService } from '../pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-pedido',
  templateUrl: './produto-pedido.component.html',
  styleUrls: ['./produto-pedido.component.css']
})
export class ProdutoPedidoComponent implements OnInit {

  quantidadeProduto: number = 0;
  itemEscolhido: Item;

  constructor(private headerPedidoService: HeaderPedidoService, private produtoService: ProdutoService,
    private pedidoService: PedidoService, private router: Router) {
  }

  ngOnInit(): void {
    this.headerPedidoService.setHeaderPedido('/pedido');
    this.itemEscolhido = this.produtoService.obterItemEscolhido();
    this.quantidadeProduto = this.pedidoService.obterQtdaItemSacola(this.itemEscolhido);
  }

  adicionaQuantidade(itemEscolhido: Item) {
    try {
      this.pedidoService.adicionarItemSacola(itemEscolhido);
      this.quantidadeProduto += 1;
    } catch (e) {
      console.log(e);
    }

  }

  subtraiQuantidade(itemEscolhido: Item) {
    try {
      if (this.quantidadeProduto > 0) {
        this.pedidoService.removerItemSacola(itemEscolhido);
        this.quantidadeProduto -= 1;
      }
    } catch (e) {
      console.log(e);
    }

  }

  verItensSacola() {

    if (this.pedidoService.obterItensSacola().length > 0) {
      this.router.navigate(['/sacola']);
    } else {
      let modalErroSemItens = document.querySelector('#modalErroSemItens') as HTMLLIElement;
      modalErroSemItens.style.display = 'flex';
    }

  }

}
