import { User } from './User';


export class PessoaFisica extends User {
    private cpf: string;
    private comprovanteDeBaixarRenda: string;
    private telefone: string;

    constructor(id: number, name: string, email: string, password: string, cpf: string, telefone: string) {
        super(id, name, email, password);
        this.cpf = cpf;
        this.comprovanteDeBaixarRenda = '';
        this.telefone = telefone;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    public getComprovanteDeBaixarRenda(): string {
        return this.comprovanteDeBaixarRenda;
    }

    public setComprovanteDeBaixarRenda(comprovanteDeBaixarRenda: string): void {
        this.comprovanteDeBaixarRenda = comprovanteDeBaixarRenda;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

}