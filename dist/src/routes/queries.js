"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queries_1 = require("../controllers/queries");
const statusDB_1 = require("../middlewares/statusDB");
const router = express_1.Router();
router.use(statusDB_1.stateTokenTwitch);
router.get('/validatetoken', queries_1.validationToken);
// router.get('/:id',    getUsuario );
// router.post('/',      postUsuario );
// router.put('/:id',    putUsuario );
// router.delete('/:id', deleteUsuario );
exports.default = router;
//# sourceMappingURL=queries.js.map