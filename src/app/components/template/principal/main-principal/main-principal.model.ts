export class Estabelecimento {

    constructor(id: number | undefined, nome: string, categoria: string, notaSatisfacao: string, taxaMinimaFrete: number) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.notaSatisfacao = notaSatisfacao;
        this.taxaMinimaFrete = taxaMinimaFrete;
    }

    id?: number
    nome: string
    categoria: string
    notaSatisfacao: string
    taxaMinimaFrete: number
    categoriasCozinhas: string[]
    categoriasProdutos: string[]
}