import express from 'express';
import { createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase } from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/purchases', createPurchase);

router.get('/purchases', getPurchases);

router.get('/purchases/:id', getPurchaseById);

router.patch('/purchases/:id', updatePurchase);

router.delete('/purchases/:id', deletePurchase);

export default router;
