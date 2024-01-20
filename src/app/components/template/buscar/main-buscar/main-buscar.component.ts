import { Component, OnInit } from '@angular/core';
import { BuscaService } from '../busca.service';
import { Cozinha } from '../cozinha.model';
import { Produto } from '../produto.model';
import { Estabelecimento } from '../../principal/main-principal/main-principal.model';
import { Router } from '@angular/router';
import { BuscaObj } from '../busca.model';

@Component({
  selector: 'app-main-buscar',
  templateUrl: './main-buscar.component.html',
  styleUrls: ['./main-buscar.component.css']
})
export class MainBuscarComponent implements OnInit {

  deepSkyBlue: any;
  estabelecimentosCategorias: string[] = [];
  cozinhas: Cozinha[] = [];
  produtos: Produto[] = [];
  estabelecimentosPossiveis: Estabelecimento[] = [];

  mercadosSelecionados: boolean = false;
  restaurantesSelecionados: boolean = false;
  categoriaEstabelecimentoBuscar: string;
  produtoBuscar: string;
  cozinhaBuscar: string;
  buscarText: string;
  buscaObj: BuscaObj;

  constructor(private buscaService: BuscaService, private router: Router) {
    this.deepSkyBlue = "3px solid deepskyblue";
  }

  ngOnInit(): void {

    /* Recupera a lista de estabelecimentos possíveis */
    this.estabelecimentosPossiveis = this.buscaService.obterEstabelecimentosPossiveis();

    if (this.estabelecimentosPossiveis.length == 0) {
      this.router.navigate(['/principal']);
    }

    /* Realiza a consulta de cozinhas 
    this.buscaService.readCozinhas().subscribe(cozinhas => {
      this.cozinhas = cozinhas;
    },
      err => {
        let modalAtencaoBuscarErroConexao = document.querySelector('#modalAtencaoBuscarErroConexao') as HTMLLIElement;
        modalAtencaoBuscarErroConexao.style.display = 'flex';
      },
    ) */

    /* Realiza a consulta de produtos 
    this.buscaService.readProdutos().subscribe(produtos => {
      this.produtos = produtos;
    },
      err => {
        let modalAtencaoBuscarErroConexao = document.querySelector('#modalAtencaoBuscarErroConexao') as HTMLLIElement;
        modalAtencaoBuscarErroConexao.style.display = 'flex';
      },
    )*/

    for (let x = 0; x < this.estabelecimentosPossiveis.length; x++) {

      //Possíveis categorias de estabelecimentos
      for (let y = 0; y < this.estabelecimentosPossiveis[x].categoria.length; y++) {

        let Estabelecimentocategoria;
        Estabelecimentocategoria = this.estabelecimentosPossiveis[x].categoria;

        let achou = false;
        for (let obj = 0; obj < this.estabelecimentosCategorias.length; obj++) {

          if (this.estabelecimentosCategorias[obj] === Estabelecimentocategoria) {
            achou = true;
            break;
          }

        }

        if (!achou) {
          this.estabelecimentosCategorias.push(Estabelecimentocategoria);
        }

      }

      //Possíveis categorias de cozinhas
      for (let y = 0; y < this.estabelecimentosPossiveis[x].categoriasCozinhas.length; y++) {

        let cozinha = new Cozinha;
        cozinha.categoriaCozinha = this.estabelecimentosPossiveis[x].categoriasCozinhas[y];

        let achou = false;
        for (let obj = 0; obj < this.cozinhas.length; obj++) {

          if (this.cozinhas[obj].categoriaCozinha === cozinha.categoriaCozinha) {
            achou = true;
            break;
          }

        }

        if (!achou) {
          this.cozinhas.push(cozinha);
        }

      }

      //Possíveis categorias de produtos
      for (let z = 0; z < this.estabelecimentosPossiveis[x].categoriasProdutos.length; z++) {

        let produto = new Produto;
        produto.categoriaProduto = this.estabelecimentosPossiveis[x].categoriasProdutos[z];

        let achou = false;
        for (let obj = 0; obj < this.produtos.length; obj++) {


          if (this.produtos[obj].categoriaProduto === produto.categoriaProduto) {
            achou = true;
            break;
          }

        }

        if (!achou) {
          this.produtos.push(produto);
        }

      }
    }

  }

  selecionar(obj: string) {
    let imagemMercados = document.querySelector('#buscarMobileMercados') as HTMLLIElement;
    let imagemRestaurantes = document.querySelector('#buscarMobileRestaurantes') as HTMLLIElement;

    if (obj === 'mercados') {
      imagemMercados.style.border = this.deepSkyBlue;
      imagemRestaurantes.style.border = 'none';
      this.mercadosSelecionados = true;
      this.restaurantesSelecionados = false;
    } else {
      imagemMercados.style.border = 'none';
      imagemRestaurantes.style.border = this.deepSkyBlue;
      this.mercadosSelecionados = false;
      this.restaurantesSelecionados = true;
    }
  }

  buscarEstabelecimentos() {

    let categoriaEstabelecimentoBuscar = document.querySelector('#categoriaEstabelecimentoBuscar') as HTMLLIElement;
    let produtoBuscar = document.querySelector('#produtoBuscar') as HTMLLIElement;
    let cozinhaBuscar = document.querySelector('#cozinhaBuscar') as HTMLLIElement;
    let buscarText = document.querySelector('#buscarText') as HTMLLIElement;

    this.categoriaEstabelecimentoBuscar = categoriaEstabelecimentoBuscar.value.toString();
    this.produtoBuscar = produtoBuscar.value.toString();
    this.cozinhaBuscar = cozinhaBuscar.value.toString();
    this.buscarText = buscarText.value.toString();

    if (this.buscarText == null || this.buscarText === '') {
      this.buscarText = 'vazio';
    }

    this.buscaObj = new BuscaObj();
    this.buscaObj.mercadosSelecionados = this.mercadosSelecionados;
    this.buscaObj.restaurantesSelecionados = this.restaurantesSelecionados;
    this.buscaObj.categoriaEstabelecimentoBuscar = this.categoriaEstabelecimentoBuscar;
    this.buscaObj.produtoBuscar = this.produtoBuscar;
    this.buscaObj.cozinhaBuscar = this.cozinhaBuscar;
    this.buscaObj.buscarText = this.buscarText;

    this.buscaService.salvarBuscaObj(this.buscaObj);

    this.router.navigate(['/principal']);
  }

}
