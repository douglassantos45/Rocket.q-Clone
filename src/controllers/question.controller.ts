import { Request, Response } from 'express';
import Database from '../database/config';

export default class QuestionController {
  async index(req: Request, res: Response) {
    const { roomId, questionId, action } = req.params;
    const { password } = req.body;

    const db = await Database();

    const verifyRoom = await db.get(
      `
    SELECT id, pass FROM rooms WHERE id = ?;
    `,
      [roomId],
    );

    if (verifyRoom.id == roomId && verifyRoom.pass == password) {
      if (action == 'check') {
        await db
          .run(
            `
        UPDATE questions
        SET read = ?
        WHERE
            id = ?
        `,
            [1, questionId],
          )
          .then((_) => console.log('Dado atualizado com sucesso.'))
          .catch((err) =>
            console.log('Erro ao atualizar o dado na tabela question\n', err),
          );
      } else {
        await db
          .run(
            `
        DELETE FROM questions
        WHERE id = ?
        `,
            [questionId],
          )
          .then((_) => console.log('Dado removido com sucesso.'))
          .catch((err) =>
            console.log('Erro ao deletar o dado na tabela question\n', err),
          );
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  }

  async create(req: Request, res: Response) {
    const { question } = req.body;
    const { roomId } = req.params;

    const db = await Database();

    if (!question) return res.status(400).json();

    await db
      .run(
        `INSERT INTO questions (title, read, room) 
      VALUES (?, ?, ?)`,
        [question, 0, roomId],
      )
      .then((_) => console.log('Dados inseridos com sucesso.'))
      .catch((err) =>
        console.log('Erro ao inserir dados na tabela question\n', err),
      );

    await db.close();

    res.redirect(`/room/${roomId}`);
  }
}
