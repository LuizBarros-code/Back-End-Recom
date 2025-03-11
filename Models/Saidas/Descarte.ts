export  class Descarte{
    private id: number;
    private name: string;
    private codigoDeReferencias: string;
    private descricao: string;
    private data: Date;
    private usuario: number;

    constructor(id: number, name: string, codigoDeReferencia: string, descricao: string, data: Date, usuario: number){
        this.id = id;
        this.name = name;
        this.codigoDeReferencias = codigoDeReferencia;
        this.descricao = descricao;
        this.data = data;
        this.usuario = usuario;
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

    public getData(): Date{
        return this.data;
    }

    public getUsuario(): number{
        return this.usuario;
    }

}