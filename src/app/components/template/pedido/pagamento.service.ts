import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Estabelecimento } from "../principal/main-principal/main-principal.model";
import { PedidoService } from "./pedido.service";
import { LoginService } from "../../login/login.service";
import { Usuario } from "../../login/usuario.model";
import { pagamentoResponse } from "./pagamento-response.model";
import { ItemSacola } from "./sacola-pedido/sacola-pedido/item-sacola.model";
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: "root",
})
export class PagamentoService {
    private baseUrl = this.variaveisGlobais.baseURL + "pedidos";
    private estabelecimentoEscolhido: Estabelecimento;
    private itensCompletosSacola: ItemSacola[] = [];
    private usuario: Usuario;
    private formaPagamentoEscolhido: string;
    private idFormaPagamentoEscolhido: number;
    private codigoPedidoGerado: string;

    constructor(private http: HttpClient, private pedidoService: PedidoService,
        private loginService: LoginService,
        private variaveisGlobais: VariaveisGlobais) { }

    salvarCodigoGerado(codigoGerado: string | undefined) {
        if (codigoGerado != undefined) {
            this.codigoPedidoGerado = codigoGerado;
        }
    }

    obterCodigoGerado(): string {
        return this.codigoPedidoGerado;
    }

    criaPedido(): Observable<pagamentoResponse> {

        this.estabelecimentoEscolhido = this.pedidoService.obterEstabelecimentoEscolhido();
        this.usuario = this.loginService.obterUsuario();
        this.itensCompletosSacola = this.pedidoService.obterItensCompletosSacola();
        this.formaPagamentoEscolhido = this.pedidoService.obterTipoPagamentoEscolhido();

        if (this.formaPagamentoEscolhido === 'CARTAO') {
            this.idFormaPagamentoEscolhido = 1
        } else {
            this.idFormaPagamentoEscolhido = 2
        }

        if (!((this.estabelecimentoEscolhido == undefined || this.estabelecimentoEscolhido == null)
            || (this.usuario == undefined || this.usuario == null)
            || (this.itensCompletosSacola == undefined || this.itensCompletosSacola == null)
            || (this.idFormaPagamentoEscolhido == undefined || this.idFormaPagamentoEscolhido == null)

        )) {

            /*Cria uma variável que guarda os itens a serem inseridos no body do pagamento, em formado string*/
            let itensCompletos = '';
            let produtoId;

            for (let i = 0; i < this.itensCompletosSacola.length; i++) {
                if (i > 0) {
                    itensCompletos += `,`
                }

                produtoId = this.itensCompletosSacola[i].item.id;

                itensCompletos += `{"produtoId": "` + produtoId + `",
                "quantidade": "` + this.itensCompletosSacola[i].qtdItem + `"}`;
            }

            /*cria o body para envio dos dados no POST*/
            const bodyRequest = `{
                "cliente": {
                    "id": ` + this.usuario.id + `
                },
                "estabelecimento": {
                    "id": ` + this.estabelecimentoEscolhido.id + `
                },
                "formaPagamento": {
                    "id": ` + this.idFormaPagamentoEscolhido + `
                },
                "nomePedido": "` + this.usuario.nome + `",
                "emailPedido": "` + this.usuario.email + `",
                "contatoPedido": "` + this.usuario.contato + `",
                "cpfPedido": "` + this.usuario.cpf + `",
                "enderecoEntrega": {
                    "cep": "` + this.usuario.cep + `",
                    "logradouro": "` + this.usuario.logradouro + `",
                    "numero": "` + this.usuario.numero + `",
                    "complemento": "` + this.usuario.complemento + `",
                    "bairro": "` + this.usuario.bairro + `",
                    "cidade": {
                        "id": ` + this.usuario.cidadeId + `
                    }
                },
                "itens": [
                    
                        ` + itensCompletos + `
                    
                ],
                "chavePixPedido": "",
                "numeroCartaoPedido": "` + this.usuario.numeroCartao + `",
                "dataValidadeCartaoPedido": "` + this.usuario.dataValidadeCartao + `",
                "codigoSegurancaCartaoPedido": "` + this.usuario.codigoSegurancaCartao + `",
                "bandeiraCartaoPedido": "` + this.usuario.bandeiraCartao + `"
                
            }`;

            /* Faz a conversão para json */
            const body = JSON.parse(bodyRequest);

            /*Faz o post no backend com o body */
            return this.http.post<pagamentoResponse>(this.baseUrl, body).pipe(
                map((obj) => obj),
                catchError((e) => this.errorHandler(e)),
            );
        } else {
            throw new Error('Houve um erro ao salvar o pedido!');
        }
    }

    confirmaPedido(): Observable<pagamentoResponse> {

        //console.log(this.codigoPedidoGerado);
        if (this.codigoPedidoGerado != undefined && this.codigoPedidoGerado != null) {
            /*Faz o put no backend com o novo código de pedido gerado */
            return this.http.put<pagamentoResponse>(this.baseUrl + '/' + this.codigoPedidoGerado + '/confirmacao', undefined).pipe(
                map((obj) => obj),
                catchError((e) => this.errorHandler(e)),
            );
        } else {
            return EMPTY;
        }

    }

    errorHandler(e: any): Observable<any> {
        console.log(e.error.detail);
        throw new Error('Houve um erro ao tentar incluir seu pedido!');
    }
}