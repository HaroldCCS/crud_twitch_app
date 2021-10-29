import { Router } from 'express';
import { validationToken } from '../controllers/queries';
import { stateTokenTwitch } from '../middlewares/statusDB';



const router = Router();

router.use(stateTokenTwitch);
router.get('/validatetoken',       validationToken )
// router.get('/:id',    getUsuario );
// router.post('/',      postUsuario );
// router.put('/:id',    putUsuario );
// router.delete('/:id', deleteUsuario );


export default router;