//import { HeaderPedido } from './header-pedido.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderPedidoService {

    private _headerPedido: string = '/principal';
    private _pagamentoSomenteLeitura: boolean = false;
    private _consultaDetalhesMeusPedidos = false;

    constructor() { }

    public get getHeaderPedido(): string {
        return this._headerPedido
    }

    public setHeaderPedido(headerPedido: string) {
        this._headerPedido = headerPedido
    }

    public get getPagamentoSomenteLeitura(): boolean {
        return this._pagamentoSomenteLeitura
    }

    public setPagamentoSomenteLeitura(somenteLeitura: boolean) {
        this._pagamentoSomenteLeitura = somenteLeitura
    }

    public get getConsultaDetalhesMeusPedidos(): boolean {
        return this._consultaDetalhesMeusPedidos
    }

    public setConsultaDetalhesMeusPedidos(consultaDetalhesMeusPedidos: boolean) {
        this._consultaDetalhesMeusPedidos = consultaDetalhesMeusPedidos
    }
}
