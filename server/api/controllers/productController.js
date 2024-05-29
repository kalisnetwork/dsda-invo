import Product from '../models/productModel.js';

// Create a new product
export const createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a product by id
export const getProductById = async (req, res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a product by id
export const updateProduct = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'manufacturer', 'stock', 'description', 'price', 'category', 'images', 'reviews'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).send();
        }

        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a product by id
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send();
        }

        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};
