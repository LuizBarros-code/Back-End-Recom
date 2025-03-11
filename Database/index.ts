import {PrismaClient} from '@prisma/client';
import { error, log } from 'console';
import { Aluno } from "../Models/Usuario/Aluno";
import { PessoaFisica } from "../Models/Usuario/PessoaFisica";
import { PessoaJuridica } from "../Models/Usuario/PessoaJuridica";

const prisma = new PrismaClient(({log: ["error", "info", "query", "warn"]}));

export const database = {

  alunos: [] as Aluno[],

  pessoasfisicas: [] as PessoaFisica[],

  pessoasjuridicas: [] as PessoaJuridica[],

};
  


export default database;

