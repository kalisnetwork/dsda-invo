import Sales from '../models/salesModel.js';

// Create a new sale
export const createSale = async (req, res) => {
    const sale = new Sales(req.body);
    try {
        await sale.save();
        res.status(201).send(sale);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all sales
export const getSales = async (req, res) => {
    try {
        const sales = await Sales.find({});
        res.send(sales);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a sale by id
export const getSaleById = async (req, res) => {
    const _id = req.params.id;
    try {
        const sale = await Sales.findById(_id);
        if (!sale) {
            return res.status(404).send();
        }
        res.send(sale);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a sale by id
export const updateSale = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['userID', 'ProductID', 'StoreID', 'StockSold', 'SaleDate', 'TotalSaleAmount'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const sale = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!sale) {
            return res.status(404).send();
        }

        res.send(sale);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a sale by id
export const deleteSale = async (req, res) => {
    try {
        const sale = await Sales.findByIdAndDelete(req.params.id);

        if (!sale) {
            return res.status(404).send();
        }

        res.send(sale);
    } catch (error) {
        res.status(500).send(error);
    }
};
