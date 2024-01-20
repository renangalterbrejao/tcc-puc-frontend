import { HeaderPedidoService } from 'src/app/components/template/pedido/header-pedido/header-pedido.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { Estabelecimento } from '../../principal/main-principal/main-principal.model';
import { LoginService } from 'src/app/components/login/login.service';
import { Usuario } from 'src/app/components/login/usuario.model';
import { PagamentoService } from '../pagamento.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-pagamento-pedido',
  templateUrl: './pagamento-pedido.component.html',
  styleUrls: ['./pagamento-pedido.component.css']
})
export class PagamentoPedidoComponent {

  pagamentoSomenteLeitura: boolean = false;
  estabelecimentoEscolhido: Estabelecimento;
  precoTotalSacola: number;
  descontoTotalSacola: number;
  precoFinal: number;
  usuarioComprador: Usuario;
  usuarioNumeroCartao: string;
  usuarioDataValidadeCartao: string;
  tipoPagamentoRealizado: string;

  constructor(private headerPedidoService: HeaderPedidoService, private router: Router, private pedidoService: PedidoService,
    private loginService: LoginService, private pagamentoService: PagamentoService) {
  }

  ngOnInit(): void {
    this.headerPedidoService.setHeaderPedido('/sacola');
    this.pagamentoSomenteLeitura = this.headerPedidoService.getPagamentoSomenteLeitura;
    this.estabelecimentoEscolhido = this.pedidoService.obterEstabelecimentoEscolhido();
    this.precoTotalSacola = this.pedidoService.obterPrecoTotalItensSacola();
    this.descontoTotalSacola = this.pedidoService.obterDescontoTotalItensSacola();
    this.usuarioComprador = this.loginService.obterUsuario();
    this.usuarioNumeroCartao = this.usuarioComprador.numeroCartao.substring(0, 4) + " XXXX XXXX " +
      this.usuarioComprador.numeroCartao.substring(15, 19);

    /** Transforma a data da validade do cartão */
    this.usuarioDataValidadeCartao = new Date(this.usuarioComprador.dataValidadeCartao)
      .toLocaleString('pt-BR', { timeZoneName: 'longOffset', timeZone: 'America/Sao_paulo' }).substring(0, 10);

    /*Cálculo do preço final*/
    this.precoFinal = (this.precoTotalSacola - this.descontoTotalSacola) + this.estabelecimentoEscolhido.taxaMinimaFrete;

    /* Lógica para exibição do tipo de pagamento escolhido - Para quando o cliente já pagou o pedido */
    this.tipoPagamentoRealizado = this.pedidoService.obterTipoPagamentoEscolhido();
  }

  mensagemCodigoCopiado() {
    let modalAtencaoCodigoCopiado = document.querySelector('#modalAtencaoCodigoCopiado') as HTMLLIElement;
    modalAtencaoCodigoCopiado.style.display = 'flex';
  }

  escondeCartao() {
    let pagamentoCartaoCredito = document.querySelector('#pagamentoCartaoCredito') as HTMLLIElement;
    pagamentoCartaoCredito.style.display = 'none';

    let pagamentoQrCode = document.querySelector('#pagamentoQrCode') as HTMLLIElement;
    pagamentoQrCode.style.display = 'flex';

    let botaoCopiarCodigoQrCode = document.querySelector('#botaoCopiarCodigoQrCode') as HTMLLIElement;
    botaoCopiarCodigoQrCode.style.display = 'block';
  }

  escondeQrCode() {
    let pagamentoCartaoCredito = document.querySelector('#pagamentoCartaoCredito') as HTMLLIElement;
    pagamentoCartaoCredito.style.display = 'block';

    let pagamentoQrCode = document.querySelector('#pagamentoQrCode') as HTMLLIElement;
    pagamentoQrCode.style.display = 'none';

    let botaoCopiarCodigoQrCode = document.querySelector('#botaoCopiarCodigoQrCode') as HTMLLIElement;
    botaoCopiarCodigoQrCode.style.display = 'none';
  }

  realizarPagamento() {

    let radioPagamentoPix = document.querySelector('#radio_pagamento_pix:checked') as HTMLLIElement;

    if (radioPagamentoPix != null) {
      this.pedidoService.salvarTipoPagamentoEscolhido('PIX');
    } else {
      this.pedidoService.salvarTipoPagamentoEscolhido('CARTAO');
    }

    /* Realiza a inclusão do pagamento e salva o código gerado no service de pagamento */
    this.pagamentoService.criaPedido().subscribe(pagamentoResposta => {
      this.pagamentoService.salvarCodigoGerado(pagamentoResposta.codigo);
      this.router.navigate(['/aguardar']);
    },
      err => {
        let modalAtencaoErroIncluirPedido = document.querySelector('#modalAtencaoErroIncluirPedido') as HTMLLIElement;
        modalAtencaoErroIncluirPedido.style.display = 'flex';
      },
    )

  }

}
