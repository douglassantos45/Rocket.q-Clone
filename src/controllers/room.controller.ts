import { Request, Response } from 'express';
import Database from '../database/config';

import handleRoomIdGeneration from '../utils/roomIdGeneration';

export default class RoomController {
  async create(req: Request, res: Response) {
    const { password } = req.body;
    let isRoom = true;
    let roomId = 0;

    const db = await Database();

    if (!password) return res.render('index', { page: 'create-pass' });

    while (isRoom) {
      roomId = parseInt(handleRoomIdGeneration());

      const roomsExistIds = await db.all(`
      SELECT id FROM rooms;
    `);

      isRoom = roomsExistIds.some((id) => id == roomId);

      if (!isRoom) {
        await db
          .run(
            `
          INSERT INTO rooms (
          id,
          pass
        ) VALUES(?, ?)
      `,
            [roomId, password],
          )
          .then((_) => console.log('Dados inseridos com sucesso'))
          .catch((err) =>
            console.log('Erro ao inserir os dados na tabela room\n', err),
          );
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  }

  async open(req: Request, res: Response) {
    const { roomId } = req.params;
    const db = await Database();

    const questions = await db.all(
      `
    SELECT
      *
    FROM
      questions
    WHERE
      room = ?
      and 
      read = ?
    `,
      [roomId, 0],
    );

    const questionsRead = await db.all(
      `
      SELECT 
        *
      FROM
        questions
      WHERE
        room = ?
        and
        read = ?
      `,
      [roomId, 1],
    );

    await db.close();

    res.render('room', { roomId, questions, questionsRead });
  }

  enter(req: Request, res: Response) {
    const { roomId } = req.body;

    res.redirect(`/room/${roomId}`);
  }
}
