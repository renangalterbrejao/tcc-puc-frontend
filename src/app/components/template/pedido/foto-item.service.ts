import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Estabelecimento } from "../principal/main-principal/main-principal.model";
import { EMPTY, Observable, catchError, map } from "rxjs";
import { Item } from "./item.model";
import { FotoItem } from "./foto-item.model";
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: "root",
})
export class FotoItemService {

    private baseUrl = this.variaveisGlobais.baseURL + "estabelecimentos";

    constructor(private http: HttpClient, private variaveisGlobais: VariaveisGlobais) { }

    public readFotoItens(estabelecimentoEscolhido: Estabelecimento, item: Item): Observable<FotoItem> {

        const url = `${this.baseUrl}/${estabelecimentoEscolhido.id}/itens/${item.id}/foto`;
        //console.log(url);

        return this.http.get<FotoItem>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );

    }

    errorHandler(e: any): Observable<any> {
        console.log(e);
        return EMPTY;
    }
}