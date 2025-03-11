enum Status{
    DISPONIVEL = "Disponível",
    TESTE = "teste",
    DESCARTE = "Descarte"
}

abstract class Eletronicos{
    private id: number;
    private codigoReferencia: string;
    private tipo: string;
    private status: Status;
    private dataDeChegada: Date;
    private dataDeSaida: Date | null;

    constructor(id: number,codigoReferencia: string ,tipo: string, status: Status, datadechegada: Date){
        this.id = id;
        this.codigoReferencia = codigoReferencia;
        this.tipo = tipo;
        this.status = status;
        this.dataDeChegada = datadechegada;
        this.dataDeSaida = null;    
    }

    public getCodigoReferencia(): string{   
        return this.codigoReferencia;
    }

    public getId(): number{
        return this.id;
    }   

    public getTipo(): string{
        return this.tipo;
    }

    public getStatus(): Status{
        return this.status;
    }

    public getDataDeChegada(): Date{
        return this.dataDeChegada;
    }

    public getDataDeSaida(): Date | null{
        return this.dataDeSaida;
    }

    public setDataDeSaida(dataDeSaida: Date): void{
        this.dataDeSaida = dataDeSaida;
    }

    public setStatus(status: Status): void{
        this.status = status;
    }
    
}