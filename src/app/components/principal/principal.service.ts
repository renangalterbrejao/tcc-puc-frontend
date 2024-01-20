import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class PrincipalService {

    constructor() { }

    selecionarMenu(id: string) {
        const menuSelecionado = document.querySelector('#' + id);
        const todosMenus = document.querySelectorAll("li");

        for (let i = 0; i < todosMenus.length; i++) {
            todosMenus[i].classList.remove('header-principal-menu-selecionado');
        }

        if (menuSelecionado) {
            menuSelecionado.classList.add('header-principal-menu-selecionado');
        }

        this.mostrarResultado(menuSelecionado?.id);
    }

    mostrarResultado(idMenuSelecionado: any) {
        let restaurantes = document.querySelector('#container-main-principal-mobile-restaurantes') as HTMLLIElement;
        let mercados = document.querySelector('#container-main-principal-mobile-mercados') as HTMLLIElement;

        if (idMenuSelecionado == 'menu-inicio') {
            restaurantes.style.display = 'flex';
            mercados.style.display = 'flex';
        }

        if (idMenuSelecionado == 'menu-restaurantes') {
            restaurantes.style.display = 'flex';
            mercados.style.display = 'none';
        }

        if (idMenuSelecionado == 'menu-mercados') {
            restaurantes.style.display = 'none';
            mercados.style.display = 'flex';
        }

        if (idMenuSelecionado == 'menu-bebidas') {
            restaurantes.style.display = 'flex';
            mercados.style.display = 'flex';
        }
    }

}  