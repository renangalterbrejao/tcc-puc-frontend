import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/components/principal/principal.service';
import { EstabelecimentoService } from './estabelecimento.service';
import { Estabelecimento } from "./main-principal.model";
import { Router } from '@angular/router';
import { PedidoService } from '../../pedido/pedido.service';
import { LoginService } from 'src/app/components/login/login.service';
import { BuscaService } from '../../buscar/busca.service';
import { BuscaObj } from '../../buscar/busca.model';
import { MeusPedidoService } from '../../meus-pedidos/meus-pedidos.service';
import { HeaderPedidoService } from '../../pedido/header-pedido/header-pedido.service';

@Component({
  selector: 'app-main-principal',
  templateUrl: './main-principal.component.html',
  styleUrls: ['./main-principal.component.css']
})

export class MainPrincipalComponent implements OnInit {

  estabelecimentos: Estabelecimento[] = []
  restaurantes: Estabelecimento[] = []
  mercados: Estabelecimento[] = []
  private principalServiceClasse: any;
  routerClasse: Router;

  restaurantesConsulta: Estabelecimento[] = [];
  mercadosConsulta: Estabelecimento[] = [];

  private buscaObj: BuscaObj;

  constructor(private principalService: PrincipalService, private mainPrincipalService: EstabelecimentoService,
    private router: Router, private pedidoService: PedidoService, private loginService: LoginService,
    private buscaService: BuscaService, private meusPedidosService: MeusPedidoService,
    private headerPedidoService: HeaderPedidoService) {
    this.principalServiceClasse = principalService;
    this.routerClasse = router;
  }

  ngOnInit(): void {
    this.meusPedidosService.setHeaderPedido('/principal');
    this.headerPedidoService.setConsultaDetalhesMeusPedidos(false);

    if (this.loginService.obterUsuario() != undefined && this.loginService.obterUsuario() != null) {

      if (this.buscaService.obterEstabelecimentosPossiveis().length == 0) {

        /* Faz a consulta de estabelecimentos disponíveis */
        this.mainPrincipalService.read(this.loginService.obterUsuario().cidadeId).subscribe(estabelecimentos => {
          this.estabelecimentos = estabelecimentos

          this.operacoesIniciais();

        })

      } else {

        this.estabelecimentos = this.buscaService.obterEstabelecimentosPossiveis();
        this.operacoesIniciais();

      }
    } else {
      this.router.navigateByUrl("/login");
    }

    /* Limpa a sacola do pedido que porventura contenha itens */
    this.pedidoService.limparSacola();

  }

  selecionarMenu(id: string) {
    this.principalServiceClasse.selecionarMenu(id);
  }

  esconderMostrarGrupo(id: any) {
    let grupo = document.querySelector('#' + id) as HTMLLIElement;

    if (grupo.id == 'grupo-restaurantes') {
      let restaurantesImg = document.querySelector('#grupo-restaurantes-img') as HTMLLIElement;
      if (restaurantesImg.getAttribute('src') == 'assets/img/btn_fechar_dados.svg') {
        restaurantesImg.setAttribute('src', 'assets/img/btn_abrir_dados.svg');
      } else {
        restaurantesImg.setAttribute('src', 'assets/img/btn_fechar_dados.svg');
      }
    }

    if (grupo.id == 'grupo-mercados') {
      let grupoMercadosImg = document.querySelector('#grupo-mercados-img') as HTMLLIElement;
      if (grupoMercadosImg.getAttribute('src') == 'assets/img/btn_fechar_dados.svg') {
        grupoMercadosImg.setAttribute('src', 'assets/img/btn_abrir_dados.svg');
      } else {
        grupoMercadosImg.setAttribute('src', 'assets/img/btn_fechar_dados.svg');
      }
    }

    if (grupo.style.display == 'flex') {
      grupo.style.display = 'none';
    } else {
      grupo.style.display = 'flex';
    }
  }

  navegarParaPedido(estabelecimento: Estabelecimento) {
    this.pedidoService.salvarEstabelecimentoEscolhido(estabelecimento);
    this.router.navigateByUrl("/pedido");
    //this.routerClasse.navigateByUrl('/pedido', { state: estabelecimento });
  }

  /* Pesquisa de itens encontrados */
  pesquisaEstabelecimentos() {

    let textoBuscar = document.querySelector('#principalMobileBuscar') as HTMLInputElement;
    this.restaurantesConsulta = [];
    this.mercadosConsulta = [];

    if (textoBuscar.value != undefined && textoBuscar.value != '') {

      // Pesquisa Restaurantes
      for (let i = 0; i < this.restaurantes.length; i++) {
        if (this.restaurantes[i].nome.toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1 ||
          this.restaurantes[i].categoria.toString().toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1) {
          this.restaurantesConsulta.push(this.restaurantes[i]);
        }
      }

      // Pesquisa Mercados
      for (let i = 0; i < this.mercados.length; i++) {
        if (this.mercados[i].nome.toLocaleLowerCase().indexOf(textoBuscar.value.toLocaleLowerCase()) != -1) {
          this.mercadosConsulta.push(this.mercados[i]);
        }
      }

    } else {
      this.restaurantesConsulta = this.restaurantes;
      this.mercadosConsulta = this.mercados;
    }

  }

  /* Ordena os mercados e restaurantes por nome */
  ordenaEstabelecimentos() {

    let componenteOrdenacao = document.querySelector('#selectPrincipalMobileOrdenacao') as HTMLSelectElement

    if (componenteOrdenacao.value !== 'ordenar') {

      if (componenteOrdenacao.value === 'alfabetica') {

        this.restaurantesConsulta.sort(function (a, b) {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        });

        this.mercadosConsulta.sort(function (a, b) {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        });

      } else {

        this.restaurantesConsulta.sort(function (a, b) {
          return a.notaSatisfacao < b.notaSatisfacao ? 1 : a.notaSatisfacao > b.notaSatisfacao ? -1 : 0;
        });

        this.mercadosConsulta.sort(function (a, b) {
          return a.notaSatisfacao < b.notaSatisfacao ? 1 : a.notaSatisfacao > b.notaSatisfacao ? -1 : 0;
        });

      }

    } else {

      this.restaurantesConsulta = this.restaurantes;
      this.mercadosConsulta = this.mercados;

    }
  }

  buscaDados() {

    this.buscaObj = this.buscaService.obterBuscaObj();

    if (this.buscaObj != undefined && this.buscaObj != null) {

      this.restaurantesConsulta = [];
      this.mercadosConsulta = [];

      /* Verifica se o usuário escolheu mercados ou restaurantes na busca */
      if (this.buscaObj.mercadosSelecionados || this.buscaObj.restaurantesSelecionados) {
        if (this.buscaObj.mercadosSelecionados) {
          this.mercadosConsulta = this.mercados;
        }

        if (this.buscaObj.restaurantesSelecionados) {
          this.restaurantesConsulta = this.restaurantes;
        }
      } else {
        this.mercadosConsulta = this.mercados;
        this.restaurantesConsulta = this.restaurantes;
      }

      /* Verifica se o usuário escolheu categoria na busca */
      if (this.buscaObj.categoriaEstabelecimentoBuscar != undefined && this.buscaObj.categoriaEstabelecimentoBuscar !== 'vazio') {

        var restaurantes = this.restaurantesConsulta;
        var mercados = this.mercadosConsulta;
        this.restaurantesConsulta = [];
        this.mercadosConsulta = [];

        // Restaurantes
        for (var i = 0; i < restaurantes.length; i++) {

          if ((this.restaurantes[i].categoria.toLowerCase().trim() ===
            this.buscaObj.categoriaEstabelecimentoBuscar.toLowerCase().trim())) {

            this.restaurantesConsulta.push(this.restaurantes[i]);

          }

        }

        // Mercados
        for (var i = 0; i < mercados.length; i++) {

          if ((this.mercados[i].categoria.toLowerCase().trim() ===
            this.buscaObj.categoriaEstabelecimentoBuscar.toLowerCase().trim())) {

            this.mercadosConsulta.push(this.mercados[i]);

          }

        }


      }

      /* Verifica se o usuário escolheu tipo de cozinha na busca */
      if (this.buscaObj.cozinhaBuscar != undefined && this.buscaObj.cozinhaBuscar !== 'vazio') {

        var restaurantes = this.restaurantesConsulta;
        var mercados = this.mercadosConsulta;
        this.restaurantesConsulta = [];
        this.mercadosConsulta = [];

        // Restaurantes
        for (var i = 0; i < restaurantes.length; i++) {

          for (var j = 0; j < restaurantes[i].categoriasCozinhas.length; j++) {

            if ((restaurantes[i].categoriasCozinhas[j].toLowerCase().trim() ===
              this.buscaObj.cozinhaBuscar.toLowerCase().trim())) {

              this.restaurantesConsulta.push(restaurantes[i]);

            }

          }

        }

        // Mercados
        for (var i = 0; i < mercados.length; i++) {

          for (var j = 0; j < mercados[i].categoriasCozinhas.length; j++) {

            if ((mercados[i].categoriasCozinhas[j].toLocaleLowerCase().trim() ===
              this.buscaObj.cozinhaBuscar.toLocaleLowerCase().trim())) {

              this.mercadosConsulta.push(mercados[i]);

            }
          }

        }

      }

      /* Verifica se o usuário escolheu tipo de produto na busca */
      if (this.buscaObj.produtoBuscar != undefined && this.buscaObj.produtoBuscar !== 'vazio') {

        var restaurantes = this.restaurantesConsulta;
        var mercados = this.mercadosConsulta;
        this.restaurantesConsulta = [];
        this.mercadosConsulta = [];

        // Restaurantes
        for (var i = 0; i < restaurantes.length; i++) {

          for (var j = 0; j < restaurantes[i].categoriasProdutos.length; j++) {

            if ((restaurantes[i].categoriasProdutos[j].toLocaleLowerCase().trim() ===
              this.buscaObj.produtoBuscar.toLocaleLowerCase().trim())) {

              this.restaurantesConsulta.push(restaurantes[i]);

            }
          }

        }

        // Mercados
        for (var i = 0; i < mercados.length; i++) {

          for (var j = 0; j < mercados[i].categoriasProdutos.length; j++) {

            if ((mercados[i].categoriasProdutos[j].toLocaleLowerCase().trim() ===
              this.buscaObj.produtoBuscar.toLocaleLowerCase().trim())) {

              this.mercadosConsulta.push(mercados[i]);

            }
          }

        }

      }

      /* Verifica se o usuário digitou algo no campo 'buscar' */
      if (this.buscaObj.buscarText != undefined && this.buscaObj.buscarText !== 'vazio') {

        let textoBuscar = document.querySelector('#principalMobileBuscar') as HTMLInputElement;
        textoBuscar.value = this.buscaObj.buscarText;

        this.pesquisaEstabelecimentos();

      }

    }

  }

  operacoesIniciais() {

    for (let i = 0; i < this.estabelecimentos.length; i++) {
      if (this.estabelecimentos[i].categoria === 'Mercado') {
        this.mercados.push(this.estabelecimentos[i]);
      } else {
        this.restaurantes.push(this.estabelecimentos[i]);
      }
    }

    this.restaurantesConsulta = this.restaurantes;
    this.mercadosConsulta = this.mercados;

    /* Salva a lista de estabelecimentos no service de busca, pra se evitar uma nova consulta */
    this.buscaService.salvarEstabelecimentosPossiveis(this.estabelecimentos);

    /* Verifica se há alguma busca no service de busca para retornar somente os estabelecimentos pesquisados */
    this.buscaDados();

  }

}
