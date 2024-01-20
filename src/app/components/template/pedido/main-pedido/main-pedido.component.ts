import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderPedidoService } from 'src/app/components/template/pedido/header-pedido/header-pedido.service';
import { Estabelecimento } from '../../principal/main-principal/main-principal.model';
import { PedidoService } from '../../pedido/pedido.service';
import { Item } from '../item.model'
import { ProdutoService } from '../produto-pedido/produto.service';

@Component({
  selector: 'app-main-pedido',
  templateUrl: './main-pedido.component.html',
  styleUrls: ['./main-pedido.component.css']
})
export class MainPedidoComponent implements OnInit {

  routerClasse: Router;
  estabelecimentoEscolhido: Estabelecimento;
  itens: Item[] = [];
  bebidas: Item[] = [];
  petiscos: Item[] = [];
  cozinhas: Item[] = [];

  bebidasConsulta: Item[] = [];
  petiscosConsulta: Item[] = [];
  cozinhasConsulta: Item[] = [];

  constructor(public headerPedidoService: HeaderPedidoService, private router: Router, private pedidoService: PedidoService,
    private produtoService: ProdutoService) {
    headerPedidoService.setHeaderPedido('/principal');
  }

  ngOnInit(): void {
    this.estabelecimentoEscolhido = this.pedidoService.obterEstabelecimentoEscolhido();
    try {
      this.pedidoService.read().subscribe(itens => {

        this.itens = this.pedidoService.associarImagensItens(itens);

        for (let i = 0; i < this.itens.length; i++) {

          if (this.itens[i].produto != undefined && this.itens[i].produto != null) {
            if (this.itens[i].produto?.categoriaProduto === 'Bebidas') {
              this.bebidas.push(this.itens[i]);
            }

            if (this.itens[i].produto?.categoriaProduto === 'Petiscos') {
              this.petiscos.push(this.itens[i]);
            }
          }

          if (this.itens[i].cozinha != undefined && this.itens[i].cozinha != null) {
            this.cozinhas.push(this.itens[i]);
          }

        }

        this.bebidasConsulta = this.bebidas;
        this.petiscosConsulta = this.petiscos;
        this.cozinhasConsulta = this.cozinhas;
      })

    } catch (e) {
      console.log(e);
      let modalErroItens = document.querySelector('#modalErroItens') as HTMLLIElement;
      modalErroItens.style.display = 'flex';
    }

  }

  navegaItem(itemEscolhido: Item) {
    this.produtoService.salvarItemEscolhido(itemEscolhido);
    this.router.navigateByUrl('/produto');
  }

  verItensSacola() {

    if (this.pedidoService.obterItensSacola().length > 0) {
      this.router.navigate(['/sacola']);
    } else {
      let modalErroSemItens = document.querySelector('#modalErroSemItens') as HTMLLIElement;
      modalErroSemItens.style.display = 'flex';
    }

  }

  /* Pesquisa de itens encontrados */
  pesquisaItens() {

    let textoBuscar = document.querySelector('#principalMobileBuscar') as HTMLInputElement;
    this.bebidasConsulta = [];
    this.petiscosConsulta = [];
    this.cozinhasConsulta = [];

    if (textoBuscar.value != undefined && textoBuscar.value != '') {

      // Pesquisa bebidas

      for (let i = 0; i < this.bebidas.length; i++) {

        if (this.bebidas[i].nome.toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1 ||
          this.bebidas[i].produto?.tipoEmbalagem.toString().toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1 ||
          this.bebidas[i].produto?.tipoMedida.toString().toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1) {
          this.bebidasConsulta.push(this.bebidas[i]);
        }
      }

      // Pesquisa petiscos
      for (let i = 0; i < this.petiscos.length; i++) {
        if (this.petiscos[i].nome.toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1 ||
          this.petiscos[i].produto?.tipoEmbalagem.toString().toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1 ||
          this.petiscos[i].produto?.tipoMedida.toString().toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1) {
          this.petiscosConsulta.push(this.petiscos[i]);
        }
      }

      // Pesquisa cozinhas
      for (let i = 0; i < this.cozinhas.length; i++) {
        //console.log(this.cozinhas[i].nome);
        if (this.cozinhas[i].nome.toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1 ||
          this.cozinhas[i].cozinha?.categoriaCozinha.toString().toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1 ||
          this.cozinhas[i].descricao.toString().toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1) {
          this.cozinhasConsulta.push(this.cozinhas[i]);
        }
      }

    } else {
      this.bebidasConsulta = this.bebidas;
      this.petiscosConsulta = this.petiscos;
      this.cozinhasConsulta = this.cozinhas;
    }

  }

}
