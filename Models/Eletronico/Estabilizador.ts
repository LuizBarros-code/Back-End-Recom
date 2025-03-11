class Estabilizador extends Eletronicos{
    private nome: string;
    private imagem: string;
    private situacao: string;
    private descricao: string;
    private marca: string;
    private potencia: number;

    constructor(id: number,codigoReferencia: string ,tipo: string, status: Status, datadechegada: Date, nome: string, imagem: string, situacao: string, descricao: string, marca: string, potencia: number){
        super(id,codigoReferencia ,tipo, status, datadechegada);
        this.nome = nome;
        this.imagem = imagem;
        this.situacao = situacao;
        this.descricao = descricao;
        this.marca = marca;
        this.potencia = potencia;
    }

    public getNome(): string{
        return this.nome;
    }

    public getImagem(): string{
        return this.imagem;
    }

    public getSituacao(): string{
        return this.situacao;
    } 

    public getDescricao(): string{
        return this.descricao;
    }

    public getMarca(): string{
        return this.marca;
    }

    public getPotencia(): number{
        return this.potencia;
    }

    public setNome(nome: string): void{
        this.nome = nome;
    }   

    public setImagem(imagem: string): void{
        this.imagem = imagem;
    }

    public setSituacao(situacao: string): void{
        this.situacao = situacao;
    }

    public setDescricao(descricao: string): void{
        this.descricao = descricao;
    }

    public setMarca(marca: string): void{
        this.marca = marca;
    }

    public setPotencia(potencia: number): void{
        this.potencia = potencia;
    }
}