import { Router } from 'express';
import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../controllers/users';
import { stateMYSQL } from '../middlewares/statusDB';


const router = Router();

router.use(stateMYSQL);
router.get('/',       getUsuarios );
router.get('/:id',    getUsuario );
router.post('/',      postUsuario );
router.put('/:id',    putUsuario );
router.delete('/:id', deleteUsuario );


export default router;