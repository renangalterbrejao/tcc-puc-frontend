import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/components/login/login.service';
import { MeusPedidoService } from '../meus-pedidos.service';
import { Estabelecimento } from '../../principal/main-principal/main-principal.model';
import { Usuario } from 'src/app/components/login/usuario.model';
import { Pedido } from '../pedido.model';
import { ItemPedido } from '../item-pedido.model';
import { PedidoService } from '../../pedido/pedido.service';
import { HeaderPedidoService } from '../../pedido/header-pedido/header-pedido.service';

@Component({
  selector: 'app-detalhe-meus-pedidos',
  templateUrl: './detalhe-meus-pedidos.component.html',
  styleUrls: ['./detalhe-meus-pedidos.component.css']
})
export class DetalheMeusPedidosComponent implements OnInit {

  precoTotalSacola: number = 0;
  descontoTotalSacola: number = 0;
  estabelecimentoEscolhido: Estabelecimento;
  usuarioComprador: Usuario
  usuarioDataValidadeCartao: string
  usuarioNumeroCartao: string
  tipoPagamentoRealizado: string
  precoFinal: number = 0;
  pedidoEscolhido: Pedido
  itensPedido: ItemPedido[] = []

  constructor(private loginService: LoginService, private meusPedidosService: MeusPedidoService,
    private pedidoService: PedidoService, private headerPedidoService: HeaderPedidoService) {
    this.meusPedidosService.setHeaderPedido('/meus_pedidos');
  }

  ngOnInit(): void {

    /* Zera os dados do service pedidoService */
    this.pedidoService.limparSacola();

    this.usuarioComprador = this.loginService.obterUsuario();

    /* Transforma o número do cartão do usuário */
    this.usuarioNumeroCartao = this.usuarioComprador.numeroCartao.substring(0, 4) + " XXXX XXXX " +
      this.usuarioComprador.numeroCartao.substring(15, 19);

    /** Transforma a data da validade do cartão */
    this.usuarioDataValidadeCartao = new Date(this.usuarioComprador.dataValidadeCartao)
      .toLocaleString('pt-BR', { timeZoneName: 'longOffset', timeZone: 'America/Sao_paulo' }).substring(0, 10);

    this.pedidoEscolhido = this.meusPedidosService.obterPedidoEscolhido();

    /* Constrói o objeto de estabelecimento escolhido, para mostrar seus dados em tela */
    this.estabelecimentoEscolhido = new Estabelecimento(this.pedidoEscolhido.estabelecimentoId,
      this.pedidoEscolhido.estabelecimentoNome,
      this.pedidoEscolhido.estabelecimentoCategoria,
      this.pedidoEscolhido.estabelecimentoNotaSatisfacao,
      this.pedidoEscolhido.estabelecimentoTaxaMinimaFrete);

    /* Recupera e guarda o tipo de pagamento do pedido escolhido */
    this.tipoPagamentoRealizado = this.pedidoEscolhido.tipoFormaPagamento.toUpperCase();

    /* Faz a consulta de pedidos realizados para o usuário logado */
    this.meusPedidosService.readItensPedido().subscribe(itensPedido => {

      this.itensPedido = itensPedido;

      for (let x = 0; x < this.itensPedido.length; x++) {
        this.precoTotalSacola += this.itensPedido[x].precoTotalItemPedido;
        this.descontoTotalSacola += this.itensPedido[x].descontoTotalItemPedido;

        for (let y = 0; y < this.itensPedido[x].quantidade; y++) {
          this.pedidoService.adicionarItemSacola(this.itensPedido[x].item);
        }
      }

      this.precoFinal = (this.precoTotalSacola - this.descontoTotalSacola) + this.estabelecimentoEscolhido.taxaMinimaFrete;
    })

    /* Prepara a tela de ver itens do pedido */
    this.pedidoService.salvarEstabelecimentoEscolhido(this.estabelecimentoEscolhido);
    this.headerPedidoService.setPagamentoSomenteLeitura(true);
    this.headerPedidoService.setConsultaDetalhesMeusPedidos(true);
  }

}
