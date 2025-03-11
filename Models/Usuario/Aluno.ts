import { User} from './User';


export class Aluno extends User{
    private matricula: string;
    private curso: string;
    private periodo: string;
    private dias: string;

    constructor(id: number, name: string, email: string, password: string, matricula: string, curso: string, periodo: string, dias: string){
        super(id, name, email, password,);
        this.matricula = matricula;
        this.curso = curso;
        this.periodo = periodo;
        this.dias = dias;
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

    public setCurso(curso: string): void{
        this.curso = curso;
    }
    public getPeriodo(): string{
        return this.periodo;
    }

    public getdias(): string{
        return this.dias;
    }

}