"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const statusDB_1 = require("../middlewares/statusDB");
const router = express_1.Router();
router.use(statusDB_1.stateMYSQL);
router.get('/', users_1.getUsuarios);
router.get('/:id', users_1.getUsuario);
router.post('/', users_1.postUsuario);
router.put('/:id', users_1.putUsuario);
router.delete('/:id', users_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=user.js.map