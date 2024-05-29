import Store from '../models/storeModel.js';

// Create a new store
export const createStore = async (req, res) => {
    const store = new Store(req.body);
    try {
        await store.save();
        res.status(201).send(store);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all stores
export const getStores = async (req, res) => {
    try {
        const stores = await Store.find({});
        res.send(stores);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a store by id
export const getStoreById = async (req, res) => {
    const _id = req.params.id;
    try {
        const store = await Store.findById(_id);
        if (!store) {
            return res.status(404).send();
        }
        res.send(store);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a store by id
export const updateStore = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'category', 'address', 'city', 'image', 'description', 'products'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!store) {
            return res.status(404).send();
        }

        res.send(store);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a store by id
export const deleteStore = async (req, res) => {
    try {
        const store = await Store.findByIdAndDelete(req.params.id);

        if (!store) {
            return res.status(404).send();
        }

        res.send(store);
    } catch (error) {
        res.status(500).send(error);
    }
};
