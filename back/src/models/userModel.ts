//importar a biblioteca do Row(Linha)Data(Dados)(Pacote)
//Guardar todos os dados que retorna da consulta Select
//O comando ResultSetHeader e utilizado para executar
//as consultas de modificação das tabelas.
//insert, update, delete
import { RowDataPacket, ResultSetHeader } from "mysql2";

//importando a conexao(pool) com o banco de dados para 
//fazer uma consulta nas tabelas do banco
import pool from "../database";

//A interface User faz uma descricao da estrutura
//de dados da tabela Usuario.
export interface User extends RowDataPacket {
    id: number;
    nomeAluno: string;
    cpf: string;
    idade: number;
    telefone: string;
}
/*
Exportar a função getAllUsers(pegarTodosOsUsuarios)
do banco de dados.
Esta função é do tipo ascíncrona e, portanto, aguarda
um processamento interno para realizar a exportação. 
o processamento será feito pela linha do await(aguardar)
*/
export async function getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<User[]>("Select * from alunos", []);
    return rows;
}

// Função para criar um novo usuário
//Aguarda o usuario ser cadastro. Portanto, estamos
//usando a função como async...await
/*
Para cadastrar um usuario sera necessario passar o usuario
por parametro e, ele sera gerenciado pelo seu id
*/
export async function createUser(user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        /*Vamos usar o comando insert para cadastrar o usuario no banco de dados.
        Estamos usando também o comando await que irá esperar pelo cadastro completo do usuario.
        Na consulta do insert esta sendo passada de ?. Consultas parametrizadas evitem a injeção de sql*/
        
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO alunos (nomeAluno, cpf, idade, telefone) VALUES (?, ? ,? ,?)',
            [user.nomeAluno, user.cpf, user.idade, user.telefone]
        );
        console.log(result);
        return result;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

// Função para atualizar um usuário existente
export async function updateUser(id: number, user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE alunos SET nomeAluno = ?, cpf = ?, idade = ?, telefone = ? WHERE id = ?',
            [user.nomeAluno, user.cpf, user.idade, user.telefone, id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}

// Função para deletar um usuário
export async function deleteUser(id: number): Promise<ResultSetHeader> {
    try {
        const [result] = await pool.execute<ResultSetHeader>('DELETE FROM alunos WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}