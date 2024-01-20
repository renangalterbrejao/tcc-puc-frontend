import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cozinha } from "./cozinha.model";
import { EMPTY, Observable, catchError, map } from "rxjs";
import { Produto } from "./produto.model";
import { Estabelecimento } from "../principal/main-principal/main-principal.model";
import { BuscaObj } from "./busca.model";
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: "root",
})
export class BuscaService {
    private urlCozinhas = this.variaveisGlobais.baseURL + "cozinhas";
    private urlProdutos = this.variaveisGlobais.baseURL + "produtos";
    private estabelecimentosPossiveis: Estabelecimento[] = [];
    private buscaObj: BuscaObj;

    constructor(private http: HttpClient, private variaveisGlobais: VariaveisGlobais) { }

    salvarEstabelecimentosPossiveis(estabelecimentosPossiveis: Estabelecimento[]) {
        this.estabelecimentosPossiveis = estabelecimentosPossiveis;
    }

    apagarEstabelecimentosPossiveis() {
        this.estabelecimentosPossiveis = [];
    }

    obterEstabelecimentosPossiveis(): Estabelecimento[] {
        return this.estabelecimentosPossiveis;
    }

    salvarBuscaObj(buscaObj: BuscaObj) {
        this.buscaObj = buscaObj;
    }

    obterBuscaObj(): BuscaObj {
        return this.buscaObj;
    }

    readCozinhas(): Observable<Cozinha[]> {

        const url = `${this.urlCozinhas}`;
        return this.http.get<Cozinha[]>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );

    }

    readProdutos(): Observable<Produto[]> {

        const url = `${this.urlProdutos}`;
        return this.http.get<Produto[]>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );

    }

    errorHandler(e: any): Observable<any> {
        throw new Error('Erro na conexão com o banco de dados!');
    }
}