import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Estabelecimento } from "./main-principal.model";
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: "root",
})
export class EstabelecimentoService {
    private baseUrl = this.variaveisGlobais.baseURL + "estabelecimentos/por-cidade";

    constructor(private http: HttpClient, private variaveisGlobais: VariaveisGlobais) { }

    read(idCidade: number | undefined): Observable<Estabelecimento[]> {
        if (idCidade != null) {
            return this.http.get<Estabelecimento[]>(this.baseUrl + '/' + idCidade).pipe(
                map((obj) => obj),
                catchError((e) => this.errorHandler(e))
            );
        } else {
            return EMPTY;
        }
    }

    private errorHandler(e: any): Observable<any> {
        //this.showMessage("Ocorreu um erro!", true);
        let modalErroEstabelecimentos = document.querySelector('#modalErroEstabelecimentos') as HTMLLIElement;
        modalErroEstabelecimentos.style.display = 'flex';
        return EMPTY;
    }
}