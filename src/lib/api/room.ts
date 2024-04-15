'use server'

import db from '@/lib/db'
import { Room } from '@prisma/client'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet(
  'abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  6,
)

export async function createRoom() {
  const newRoomId = nanoid()

  const newRoom = await db.room.create({
    data: {
      id: newRoomId,
    },
  })

  return newRoom
}

export async function getRoom({ id }: Pick<Room, 'id'>) {
  const room = await db.room.findFirst({
    where: {
      id,
    },
  })

  return room
}
