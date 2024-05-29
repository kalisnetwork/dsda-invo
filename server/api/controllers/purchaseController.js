import Purchase from '../models/purchaseModel.js';

// Create a new purchase
export const createPurchase = async (req, res) => {
    const purchase = new Purchase(req.body);
    try {
        await purchase.save();
        res.status(201).send(purchase);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all purchases
export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({});
        res.send(purchases);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a purchase by id
export const getPurchaseById = async (req, res) => {
    const _id = req.params.id;
    try {
        const purchase = await Purchase.findById(_id);
        if (!purchase) {
            return res.status(404).send();
        }
        res.send(purchase);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a purchase by id
export const updatePurchase = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['userID', 'ProductID', 'QuantityPurchased', 'PurchaseDate', 'TotalPurchaseAmount'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!purchase) {
            return res.status(404).send();
        }

        res.send(purchase);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a purchase by id
export const deletePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.findByIdAndDelete(req.params.id);

        if (!purchase) {
            return res.status(404).send();
        }

        res.send(purchase);
    } catch (error) {
        res.status(500).send(error);
    }
};
