export  class Doacao{
    private id: number;
    private name: string;
    private codigoDeReferencias: string;
    private descricao: string;
    private justificativa: string;
    private nomeOuEmpresa: string;
    private contato: string;
    private data: Date;
    private status: string;
    private donatario: number;
    private usuariofisico: number;
    private usuariojuridico: number;

    constructor(id: number, name: string, codigoDeReferencia: string, descricao: string, justificativa: string, nomeOuEmpresa: string, contato: string, data: Date, status: string, donatario: number, usuariofisico: number, usuariojuridico: number){
        this.id = id;
        this.name = name;
        this.codigoDeReferencias = codigoDeReferencia;
        this.descricao = descricao;
        this.justificativa = justificativa;
        this.nomeOuEmpresa = nomeOuEmpresa;
        this.contato = contato;
        this.data = data;
        this.status = status;
        this.donatario = donatario;
        this.usuariofisico = usuariofisico;
        this.usuariojuridico = usuariojuridico;
    }

    public getId(): number{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getCodigoDeReferencia(): string{
        return this.codigoDeReferencias;
    }

    public getDescricao(): string{
        return this.descricao;
    }

    public getJustificativa(): string{
        return this.justificativa;
    }

    public getnomeOuEmpresa(): string{
        return this.nomeOuEmpresa;
    }

    public getContato(): string{
        return this.contato;
    }

    public getStatus(): string{
        return this.status;
    }

    public getData(): Date{
        return this.data;
    }

    public getDonatario(): number{
        return this.donatario;
    }

    public getUsuarioFisico(): number{
        return this.usuariofisico;
    }

    public getUsuarioJuridico(): number{
        return this.usuariojuridico;
    }

    public setstatus(status: string): void{
        this.status = status;
    }
    
}