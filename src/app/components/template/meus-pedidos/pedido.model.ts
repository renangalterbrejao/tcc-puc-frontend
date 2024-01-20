export interface Pedido {
    id?: number
    codigo: string
    tipoFormaPagamento: string
    precoFinal: number
    dataHorarioConfirmacao: string
    estabelecimentoId?: number
    estabelecimentoNome: string
    estabelecimentoTaxaMinimaFrete: number
    estabelecimentoCategoria: string
    estabelecimentoNotaSatisfacao: string
    estabelecimentoImagem: string
}