import { User } from './User';

export class PessoaJuridica extends User {
    private cnpj: string;
    private endereco: string;
    private comprovanteDeProjeto: string;
    private telefone: string;

    constructor(id: number, name: string, email: string, password: string, cnpj: string, endereco: string, telefone: string) {
        super(id, name, email, password);
        this.cnpj = cnpj;
        this.endereco = endereco;
        this.comprovanteDeProjeto = '';
        this.telefone = telefone;
    }

    public getCnpj(): string {
        return this.cnpj;
    }

    public setCnpj(cnpj: string): void {
        this.cnpj = cnpj;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getComprovanteDeProjeto(): string {
        return this.comprovanteDeProjeto;
    }   

    public setComprovanteDeProjeto(comprovanteDeProjeto: string): void {
        this.comprovanteDeProjeto = comprovanteDeProjeto;
    }
    
 
}