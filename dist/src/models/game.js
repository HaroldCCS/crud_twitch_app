"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});
exports.GameModel = (0, mongoose_1.model)('Game', schema);
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
//# sourceMappingURL=game.js.map