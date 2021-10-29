import { Router } from 'express';
import { stateMongo } from '../middlewares/statusDB';
import { deleteGame, getGame, getGames, getGamesTop, postGame, putGame } from '../controllers/games';


const router = Router();

router.use(stateMongo);

router.get('/',       getGames );
router.get('/top',       getGamesTop );
router.get('/:id',    getGame );
router.post('/',      postGame );
router.put('/:id',    putGame );
router.delete('/:id', deleteGame );


export default router;