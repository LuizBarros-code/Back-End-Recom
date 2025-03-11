export  class solicitacao{
    private id: number;
    private name: string;
    private eletronicos: string;
    private descricao: string;
    private informacoes: string;
    private horarioparapegar: string;
    private contato: string;
    private data: Date;
    private dataparapegar: Date;
    private status: string;
    private usuariosolicitacaofisico: number;
    private usuariosolicitacaojuridico: number;
    private usuario: number;



    constructor(id: number, name: string, eletronicos: string, descricao: string, informacoesAdicionais: string, horarioparapegar: string, contato: string, data: Date, status: string, dataparapegar: Date, usuariosolicitacaofisico: number,usuariosolicitacaojuridico: number ,usuario: number){
        this.id = id;
        this.name = name;
        this.eletronicos = eletronicos;
        this.descricao = descricao;
        this.informacoes = informacoesAdicionais;
        this.horarioparapegar = horarioparapegar;
        this.contato = contato;
        this.data = data;
        this.status = status;
        this.dataparapegar = dataparapegar;
        this.usuariosolicitacaofisico = usuariosolicitacaofisico;
        this.usuariosolicitacaojuridico = usuariosolicitacaojuridico;
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

    public getInformacoes(): string{
        return this.informacoes;
    }

    public getHorarioParaPegar(): string{
        return this.horarioparapegar;
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

    public getDataParaPegar(): Date{
        return this.dataparapegar;
    }

    public getUsuarioSolicitacaoFisico(): number{
        return this.usuariosolicitacaofisico;
    }

    public getUsuarioSolicitacaoJuridico(): number{
        return this.usuariosolicitacaojuridico;
    }

    public getUsuario(): number{
        return this.usuario;
    }

    public sethorarioparapegar(horarioparapegar: string): void{
        this.horarioparapegar = horarioparapegar;
    }

    public setstatus(status: string): void{
        this.status = status;
    }

    public setdataparapegar(dataparapegar: Date): void{
        this.dataparapegar = dataparapegar;
    }
}