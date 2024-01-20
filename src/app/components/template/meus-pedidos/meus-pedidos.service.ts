import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Pedido } from "./pedido.model";
import { LoginService } from "../../login/login.service";
import { Usuario } from "../../login/usuario.model";
import { ItemPedido } from "./item-pedido.model";
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: "root",
})
export class MeusPedidoService {

    private baseUrl = this.variaveisGlobais.baseURL + "pedidos";
    usuarioLogado: Usuario;
    pedidoEscolhido: Pedido;
    itensPedido: ItemPedido;
    private _headerPedido: string = '/principal';

    constructor(private http: HttpClient, private loginService: LoginService,
        private variaveisGlobais: VariaveisGlobais) { }

    public get getHeaderPedido(): string {
        return this._headerPedido
    }

    public setHeaderPedido(headerPedido: string) {
        this._headerPedido = headerPedido
    }

    salvarPedidoEscolhido(pedidoEscolhido: Pedido) {
        this.pedidoEscolhido = pedidoEscolhido;
    }

    obterPedidoEscolhido(): Pedido {
        return this.pedidoEscolhido;
    }

    read(): Observable<Pedido[]> {

        this.usuarioLogado = this.loginService.obterUsuario();

        const url = `${this.baseUrl}/porUsuario/${this.usuarioLogado.id}`;
        return this.http.get<Pedido[]>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );

    }

    readItensPedido(): Observable<ItemPedido[]> {

        this.usuarioLogado = this.loginService.obterUsuario();

        const url = `${this.baseUrl}/itensporCodigo/${this.pedidoEscolhido.codigo}`;
        return this.http.get<ItemPedido[]>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );

    }

    associarImagensEstabelecimentos(pedidos: Pedido[]): Pedido[] {

        var pedidosTemporarios = pedidos;

        for (let i = 0; i < pedidosTemporarios.length; i++) {
            if (pedidosTemporarios[i].estabelecimentoNome === 'São Vicente') {
                pedidosTemporarios[i].estabelecimentoImagem = 'assets/img/sao_vicente.svg'
            }

            if (pedidosTemporarios[i].estabelecimentoNome === 'Carvalho') {
                pedidosTemporarios[i].estabelecimentoImagem = 'assets/img/adega_carvalho.svg'
            }

            if (pedidosTemporarios[i].estabelecimentoNome === 'La Baroni') {
                pedidosTemporarios[i].estabelecimentoImagem = 'assets/img/la_baroni.svg'
            }

            if (pedidosTemporarios[i].estabelecimentoNome === 'Fort Atacadista') {
                pedidosTemporarios[i].estabelecimentoImagem = 'assets/img/fort_atacadista.svg'
            }

            if (pedidosTemporarios[i].estabelecimentoNome === 'Maxi Atacado') {
                pedidosTemporarios[i].estabelecimentoImagem = 'assets/img/maxi_atacado.svg'
            }

            if (pedidosTemporarios[i].estabelecimentoNome === 'Dona Filó') {
                pedidosTemporarios[i].estabelecimentoImagem = 'assets/img/dona_filo.svg'
            }


        }

        return pedidosTemporarios;
    }

    errorHandler(e: any): Observable<any> {
        //let modalErroItens = document.querySelector('#modalErroItens') as HTMLLIElement;
        //modalErroItens.style.display = 'flex';
        return EMPTY;
    }
}