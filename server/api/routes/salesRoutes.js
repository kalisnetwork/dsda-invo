import express from 'express';
import { createSale, getSales, getSaleById, updateSale, deleteSale } from '../controllers/salesController.js';

const router = express.Router();

router.post('/sales', createSale);

router.get('/sales', getSales);

router.get('/sales/:id', getSaleById);

router.patch('/sales/:id', updateSale);

router.delete('/sales/:id', deleteSale);

export default router;
