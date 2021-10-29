import { Schema, model, connect } from 'mongoose';

interface Game {
  name: string;
  email: string;
  avatar?: string;
}


const schema = new Schema<Game>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});


export const GameModel = model<Game>('Game', schema);

/*
run().catch(err => console.log(err));

async function run(): Promise<void> {
  // 4. Connect to MongoDB
  await connect('mongodb://localhost:27017/test');

  const doc = new GameModel({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  await doc.save();

  console.log(doc.email); // 'bill@initech.com'
}
*/