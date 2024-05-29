import express from 'express';
import { createStore, getStores, getStoreById, updateStore, deleteStore } from '../controllers/storeController.js';

const router = express.Router();

router.post('/stores', createStore);

router.get('/stores', getStores);

router.get('/stores/:id', getStoreById);

router.patch('/stores/:id', updateStore);

router.delete('/stores/:id', deleteStore);

export default router;
