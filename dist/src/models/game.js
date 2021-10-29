"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: false },
    users: { type: Number, required: false }
});
exports.GameModel = mongoose_1.model('Games', schema);
//# sourceMappingURL=game.js.map