import { HeaderPedidoService } from 'src/app/components/template/pedido/header-pedido/header-pedido.service';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../pedido.service';
import { Item } from '../../item.model'
import { Router } from '@angular/router';
import { ItemSacola } from './item-sacola.model';
import { ItemSacolaObj } from './item-sacola';
import { Estabelecimento } from '../../../principal/main-principal/main-principal.model';

@Component({
  selector: 'app-sacola-pedido',
  templateUrl: './sacola-pedido.component.html',
  styleUrls: ['./sacola-pedido.component.css']
})
export class SacolaPedidoComponent implements OnInit {

  itemSacola: ItemSacolaObj;
  itensSacola: ItemSacola[] = [];
  sacola: Item[] = [];
  cozinhas: ItemSacola[] = [];
  bebidas: ItemSacola[] = [];
  petiscos: ItemSacola[] = [];
  estabelecimentoEscolhido: Estabelecimento;
  pagamentoSomenteLeitura: boolean;

  constructor(private headerPedidoService: HeaderPedidoService, private pedidoService: PedidoService, private router: Router) {
  }

  ngOnInit(): void {
    this.headerPedidoService.setHeaderPedido('/pedido');
    this.estabelecimentoEscolhido = this.pedidoService.obterEstabelecimentoEscolhido();
    this.pagamentoSomenteLeitura = this.headerPedidoService.getPagamentoSomenteLeitura;

    if (this.pedidoService.obterItensSacola().length == 0) {
      this.router.navigate(['/pedido']);
    } else {
      this.sacola = this.pedidoService.obterItensSacola();

      this.sacola = this.pedidoService.associarImagensItens(this.sacola);

      for (let i = 0; i < this.sacola.length; i++) {

        let achouItem = false;
        for (let j = 0; j < this.itensSacola.length; j++) {
          if (this.pedidoService.isEquivalent(this.sacola[i], this.itensSacola[j].item)) {

            this.itensSacola[j].qtdItem = this.itensSacola[j].qtdItem + 1;
            this.itensSacola[j].precoFinal = this.itensSacola[j].precoFinal + this.sacola[i].preco;
            achouItem = true;
            break;

          }
        }
        if (!achouItem) {

          this.itemSacola = new ItemSacolaObj();
          this.itemSacola.item = this.sacola[i];
          this.itemSacola.qtdItem = 1;
          this.itemSacola.precoFinal = this.sacola[i].preco;
          this.itensSacola.push(this.itemSacola);

        }
      }



      for (let i = 0; i < this.itensSacola.length; i++) {

        if (this.itensSacola[i].item.produto != undefined && this.itensSacola[i].item.produto != null) {
          if (this.itensSacola[i].item.produto?.categoriaProduto === 'Bebidas') {
            this.bebidas.push(this.itensSacola[i]);
          }

          if (this.itensSacola[i].item.produto?.categoriaProduto === 'Petiscos') {
            this.petiscos.push(this.itensSacola[i]);
          }
        }

        if (this.itensSacola[i].item.cozinha != undefined && this.itensSacola[i].item.cozinha != null) {
          this.cozinhas.push(this.itensSacola[i]);
        }

      }
    }
  }

  limpaSacola() {
    this.pedidoService.limparSacola();
    this.router.navigate(['/pedido']);
  }

  continuarPagamento() {
    if (this.pedidoService.obterEstabelecimentoEscolhido().taxaMinimaFrete != undefined &&
      this.pedidoService.obterEstabelecimentoEscolhido().taxaMinimaFrete != 0.0) {

      let somaTodosValoresProdutos = 0.0;

      for (let i = 0; i < this.itensSacola.length; i++) {
        somaTodosValoresProdutos += this.itensSacola[i].precoFinal;
      }

      if (somaTodosValoresProdutos < this.pedidoService.obterEstabelecimentoEscolhido().taxaMinimaFrete) {

        let modalAtencaoErroValorMinimo = document.querySelector('#modalAtencaoErroValorMinimo') as HTMLLIElement;
        modalAtencaoErroValorMinimo.style.display = 'flex';

      } else {
        this.pedidoService.salvarItensCompletosSacola(this.itensSacola);
        this.navegaDestino();
      }

    } else {
      this.pedidoService.salvarItensCompletosSacola(this.itensSacola);
      this.navegaDestino();
    }
  }

  navegaDestino() {
    if (this.headerPedidoService.getConsultaDetalhesMeusPedidos) {
      this.router.navigate(['/detalhe_meus_pedidos']);
    } else {
      this.router.navigate(['/pagamento']);
    }
  }

}
