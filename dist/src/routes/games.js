"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statusDB_1 = require("../middlewares/statusDB");
const games_1 = require("../controllers/games");
const router = express_1.Router();
router.use(statusDB_1.stateMongo);
router.get('/', games_1.getGames);
router.get('/top', games_1.getGamesTop);
router.get('/:id', games_1.getGame);
router.post('/', games_1.postGame);
router.put('/:id', games_1.putGame);
router.delete('/:id', games_1.deleteGame);
exports.default = router;
//# sourceMappingURL=games.js.map