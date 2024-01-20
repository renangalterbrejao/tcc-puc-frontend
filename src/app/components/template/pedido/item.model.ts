export interface Item {
    id?: number
    nome: string
    descricao: string
    preco: number
    desconto: number
    ativo: boolean
    cozinha?: {
        id?: number
        categoriaCozinha: string
    }
    imagem: string
    observacao: string
    produto?: {
        id?: number
        categoriaProduto: string
        tipoEmbalagem: string
        quantidadeMedida: number
        tipoMedida: string
    }
}