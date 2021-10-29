import { Schema, model } from 'mongoose';

interface Game {
  id: string;
  name: string;
  description?: string;
  category?: string;
  users?: number;
}


const schema = new Schema<Game>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: false },
  users: { type: Number, required: false }
});


export const GameModel = model<Game>('Games', schema);