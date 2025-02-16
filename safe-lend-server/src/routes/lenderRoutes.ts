import express from 'express';
import { createLender, getLenders, updateLender, deleteLender } from '../controllers/lenderController';

const router = express.Router();

router.post('/', createLender);
router.get('/', getLenders);
router.put('/:id', updateLender);
router.delete('/:id', deleteLender);

export default router;
