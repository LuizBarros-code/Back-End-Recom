export  class DoacaoUsuario{
    private id: number;
    private name: string;
    private eletronicos: string;
    private descricao: string;
    private informacoesAdicionais: string;
    private horarioDeEntrega: string;
    private contato: string;
    private data: Date;
    private status: string;
    private donatariofisico: number;
    private donatariojuridico: number;
    private usuario: number;

    constructor(id: number, name: string, eletronicos: string, descricao: string, informacoesAdicionais: string, horarioDeEntrega: string, contato: string, data: Date, status: string, donatariofisico: number,donatariojuridico: number ,usuario: number){
        this.id = id;
        this.name = name;
        this.eletronicos = eletronicos;
        this.descricao = descricao;
        this.informacoesAdicionais = informacoesAdicionais;
        this.horarioDeEntrega = horarioDeEntrega;
        this.contato = contato;
        this.data = data;
        this.status = status;
        this.donatariofisico = donatariofisico;
        this.donatariojuridico = donatariojuridico;
        this.usuario = usuario;
    }

    public getId(): number{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getEletronicos(): string{
        return this.eletronicos;
    }

    public getDescricao(): string{
        return this.descricao;
    }

    public getInformacoesAdicionais(): string{
        return this.informacoesAdicionais;
    }

    public getHorarioDeEntrega(): string{
        return this.horarioDeEntrega;
    }

    public getContato(): string{
        return this.contato
    }

    public getData(): Date{
        return this.data;
    }
     
    public getStatus(): string{
        return this.status;
    }

    public setstatus(status: string): void{
        this.status = status;
    }

    public getDonatarioFisico(): number{
        return this.donatariofisico;
    }

    public getDonatarioJuridico(): number{
        return this.donatariojuridico;
    }

    public getUsuario(): number{
        return this.usuario;
    }

}