import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Estabelecimento } from "../principal/main-principal/main-principal.model";
import { Item } from './item.model'
import { ItemSacola } from "./sacola-pedido/sacola-pedido/item-sacola.model";
import { FotoItemService } from "./foto-item.service";
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: "root",
})
export class PedidoService {
    private baseUrl = this.variaveisGlobais.baseURL + "estabelecimentos";
    private estabelecimentoEscolhido: Estabelecimento;
    private sacola: Item[] = [];
    private tipoPagamentoEscolhido: string;
    private itensCompletosSacola: ItemSacola[] = [];
    private baseUrlAmazonS3 = "https://algafood-renan-brejao-test.s3.amazonaws.com/catalogo/";

    constructor(private http: HttpClient,
        private fotoItemService: FotoItemService,
        private variaveisGlobais: VariaveisGlobais) { }

    salvarEstabelecimentoEscolhido(establecimentoEscolhido: Estabelecimento) {
        this.estabelecimentoEscolhido = establecimentoEscolhido;
    }

    obterEstabelecimentoEscolhido(): Estabelecimento {
        return this.estabelecimentoEscolhido;
    }

    salvarTipoPagamentoEscolhido(TipoPagamentoEscolhido: string) {
        this.tipoPagamentoEscolhido = TipoPagamentoEscolhido;
    }

    obterTipoPagamentoEscolhido(): string {
        return this.tipoPagamentoEscolhido;
    }

    salvarItensCompletosSacola(itensSacola: ItemSacola[]) {
        this.itensCompletosSacola = itensSacola;
        //console.log(itensSacola[0].item.produto?.id);
    }

    obterItensCompletosSacola(): ItemSacola[] {
        return this.itensCompletosSacola;
    }

    read(): Observable<Item[]> {
        if (this.estabelecimentoEscolhido != undefined && this.estabelecimentoEscolhido != null) {
            const url = `${this.baseUrl}/${this.estabelecimentoEscolhido.id}/itens`;
            return this.http.get<Item[]>(url).pipe(
                map((obj) => obj),
                catchError((e) => this.errorHandler(e))
            );
        }
        return EMPTY;
    }

    adicionarItemSacola(novoItem: Item) {
        this.sacola.push(novoItem);
    }

    removerItemSacola(itemASerExcluido: Item) {
        for (let i = 0; i < this.sacola.length; i++) {
            if (this.isEquivalent(this.sacola[i], itemASerExcluido)) {
                this.sacola.splice(i, 1);
                break;
            }
        }
    }

    obterQtdaItemSacola(item: Item): number {
        let quantidade = 0;

        for (let i = 0; i < this.sacola.length; i++) {
            if (this.isEquivalent(this.sacola[i], item)) {
                quantidade++;
            }
        }

        return quantidade;
    }

    obterPrecoTotalItensSacola(): number {
        let precoTotal = 0.0;

        for (let i = 0; i < this.sacola.length; i++) {
            precoTotal += this.sacola[i].preco;
        }

        return precoTotal;
    }

    obterDescontoTotalItensSacola(): number {
        let descontoTotal = 0.0;

        for (let i = 0; i < this.sacola.length; i++) {
            descontoTotal += this.sacola[i].desconto;
        }

        return descontoTotal;
    }

    obterItensSacola(): Item[] {
        return this.sacola;
    }

    limparSacola() {
        this.sacola = [];
    }

    isEquivalent(object1: any, object2: any) {
        var prop1 = Object.getOwnPropertyNames(object1);
        var prop2 = Object.getOwnPropertyNames(object1);

        if (prop1.length !== prop2.length)
            return false;

        if (prop1.length === 0)
            if (object1 === object2)
                return true;
            else
                return false;

        for (var i = 0; i < prop1.length; i++) {
            var prop = prop1[i];

            if (object1[prop] !== object2[prop]) {
                if (this.isEquivalent(object1[prop], object2[prop]))
                    continue;
                else
                    return false;
            }
        }

        return true;
    }

    associarImagensItens(itens: Item[]): Item[] {

        var itensTemporarios = itens;

        for (let i = 0; i < itensTemporarios.length; i++) {

            /* Faz a consulta da foto do produto na Amazon S3 */
            this.fotoItemService.readFotoItens(this.estabelecimentoEscolhido, itensTemporarios[i]).subscribe(fotoItem => {
                itensTemporarios[i].imagem = this.baseUrlAmazonS3 + fotoItem.nomeArquivo;
            })

        }

        return itensTemporarios;
    }

    errorHandler(e: any): Observable<any> {
        let modalErroItens = document.querySelector('#modalErroItens') as HTMLLIElement;
        modalErroItens.style.display = 'flex';
        return EMPTY;
    }
}