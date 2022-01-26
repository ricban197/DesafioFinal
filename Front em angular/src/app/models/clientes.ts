import { Endereco } from "./endereco";
export interface Clientes {
    id:number;
    nome:string;
    numero:string;
    email:string;
    cep:string;
    endereco :Endereco;
}
