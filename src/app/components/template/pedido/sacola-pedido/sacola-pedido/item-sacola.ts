import { Item } from "../../item.model";
import { ItemSacola } from "./item-sacola.model";


export class ItemSacolaObj implements ItemSacola {

    constructor() {

    }

    public item: Item;
    public qtdItem: number = 0;
    public precoFinal: number = 0.0;
}