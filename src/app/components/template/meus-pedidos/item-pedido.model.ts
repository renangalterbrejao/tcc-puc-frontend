import { Item } from "../pedido/item.model";

export interface ItemPedido {
    item: Item,
    quantidade: number,
    precoItemPedido: number,
    descontoItemPedido: number,
    precoTotalItemPedido: number,
    descontoTotalItemPedido: number
}