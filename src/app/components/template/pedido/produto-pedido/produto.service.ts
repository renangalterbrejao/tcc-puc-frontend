import { Injectable } from "@angular/core";
import { Item } from '../item.model'

@Injectable({
    providedIn: "root",
})
export class ProdutoService {
    private itemEscolhido: Item;

    constructor() { }

    salvarItemEscolhido(itemEscolhido: Item) {
        this.itemEscolhido = itemEscolhido;
    }

    obterItemEscolhido(): Item {
        return this.itemEscolhido;
    }
}