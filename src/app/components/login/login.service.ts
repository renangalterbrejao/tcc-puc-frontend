import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Usuario } from "./usuario.model";
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: "root",
})

export class LoginService {

    private baseUrl = this.variaveisGlobais.baseURL + "usuarios";
    private usuario: Usuario;
    private usuarioAutenticado: Observable<boolean> | boolean = false;

    constructor(private http: HttpClient, private variaveisGlobais: VariaveisGlobais) { }

    read(email: string | null, senha: string | null): Observable<Usuario> {
        if (email != null && senha != null) {

            let queryParams = new HttpParams();
            queryParams = queryParams.append("email", email);
            queryParams = queryParams.append("senha", senha);

            //return this.http.get<Usuario>(this.baseUrl + '/' + email).pipe(
            return this.http.get<Usuario>(this.baseUrl, { params: queryParams }).pipe(
                map((obj) => obj),
                catchError((e) => this.errorHandler(e)),
            );
        } else {
            return EMPTY;
        }
    }

    salvarUsuario(usuario: Usuario) {
        this.usuario = usuario;
    }

    setUsuarioAutenticado(usuarioAutenticado: boolean) {
        this.usuarioAutenticado = usuarioAutenticado;
    }

    isUsuarioAutenticado(): Observable<boolean> | boolean {
        return this.usuarioAutenticado;
    }

    obterUsuario(): Usuario {
        return this.usuario;
    }

    errorHandler(e: any): Observable<any> {
        if (e.status == 0) {
            let modalAtencaoLoginErroConexao = document.querySelector('#modalAtencaoLoginErroConexao') as HTMLLIElement;
            modalAtencaoLoginErroConexao.style.display = 'flex';
        } else {
            let modalAtencaoLoginErro = document.querySelector('#modalAtencaoLoginErro') as HTMLLIElement;
            modalAtencaoLoginErro.style.display = 'flex';
        }
        return EMPTY;
    }

}