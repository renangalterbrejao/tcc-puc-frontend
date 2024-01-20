export interface Usuario {
    id?: number
    nome: string
    email: string
    senha: string
    contato: string
    cpf: string
    cep: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidadeId?: number
    cidade: string
    estado: string
    numeroCartao: string
    dataValidadeCartao: string
    codigoSegurancaCartao: string
    bandeiraCartao: string
    dataNascimento: string
}