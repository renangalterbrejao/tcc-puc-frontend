import { HeaderPedidoService } from 'src/app/components/template/pedido/header-pedido/header-pedido.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../pedido.model';
import { MeusPedidoService } from '../meus-pedidos.service';

@Component({
  selector: 'app-main-meus-pedidos',
  templateUrl: './main-meus-pedidos.component.html',
  styleUrls: ['./main-meus-pedidos.component.css']
})
export class MainMeusPedidosComponent implements OnInit {

  meusPedidos: Pedido[] = [];
  meusPedidosConsulta: Pedido[] = [];

  constructor(private router: Router,
    private meusPedidosService: MeusPedidoService) {
    this.meusPedidosService.setHeaderPedido('/principal');
  }

  ngOnInit(): void {

    /* Faz a consulta de pedidos realizados para o usuário logado */
    this.meusPedidosService.read().subscribe(meusPedidos => {

      this.meusPedidos = meusPedidos;

      this.meusPedidos = this.meusPedidosService.associarImagensEstabelecimentos(this.meusPedidos);

      /** Transforma a data da confirmação do pedido */
      for (let x = 0; x < this.meusPedidos.length; x++) {
        this.meusPedidos[x].dataHorarioConfirmacao = new Date(this.meusPedidos[x].dataHorarioConfirmacao)
          .toLocaleString('pt-BR', { timeZoneName: 'longOffset', timeZone: 'America/Sao_paulo' }).substring(0, 17).replace(',', '');
      }

      this.meusPedidosConsulta = this.meusPedidos;

    })

  }

  detalharPedido(pedido: Pedido) {

    this.meusPedidosService.salvarPedidoEscolhido(pedido);
    this.router.navigate(['/detalhe_meus_pedidos']);

  }

  /* Ordena os estabelecimentos por data ou valor de compra */
  ordenaEstabelecimentos() {

    let componenteOrdenacao = document.querySelector('#selectPrincipalMobileOrdenacao') as HTMLSelectElement

    if (componenteOrdenacao.value !== 'Ordenar') {

      if (componenteOrdenacao.value === 'Data') {

        this.meusPedidosConsulta.sort(function (a, b) {
          return a.dataHorarioConfirmacao < b.dataHorarioConfirmacao ? -1 :
            a.dataHorarioConfirmacao > b.dataHorarioConfirmacao ? 1 : 0;
        });

      } else {

        this.meusPedidosConsulta.sort(function (a, b) {
          return a.precoFinal < b.precoFinal ? 1 : a.precoFinal > b.precoFinal ? -1 : 0;
        });

      }

    }

  }

}
