export class Inscrito{
    private id: number;
    private name: string;
    private email: string;
    private dias: string;
    private matricula: string;
    private curso: string;
    private periodo: string;
    private bolsista: boolean;

    constructor(id: number,name: string, email: string,dias: string, matricula: string, curso: string, periodo: string, bolsista: boolean){
        this.id = id;
        this.name = name;
        this.email = email;
        this.dias = dias;
        this.matricula = matricula;
        this.curso = curso;
        this.periodo = periodo;
        this.bolsista = bolsista;
    }

    public getId(): number{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getEmail(): string{
        return this.email;
    }

    public getDias(): string{
        return this.dias;
    }

    public getMatricula(): string{
        return this.matricula;
    }

    public setMatricula(matricula: string): void{
        this.matricula = matricula;
    }

    public getCurso(): string{
        return this.curso;
    }

    public getPeriodo(): string{
        return this.periodo;
    }

    public getBolsista(): boolean{
        return this.bolsista;
    }

    public setCurso(curso: string): void{
        this.curso = curso;
    }

}