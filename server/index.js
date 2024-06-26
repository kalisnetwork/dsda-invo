import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import salesRoutes from './api/routes/salesRoutes.js';
import productRoutes from './api/routes/productRoutes.js';
import purchaseRoutes from './api/routes/purchaseRoutes.js';
import storeRoutes from './api/routes/storeRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

app.use('/api', salesRoutes);
app.use('/api', productRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', storeRoutes);

app.get("/api", function (req, res) {
    res.json({ message: "DSDA Invo api" });
});
app.get("/", function (req, res) {
    res.json({ message: "DSDA Invo Server Started" });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(err);

    let errorDetails = {};
    if (process.env.NODE_ENV === 'development') {
        errorDetails.stack = err.stack;
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...errorDetails,
    });
});

app.get('/api/verifyToken', (req, res) => {
    const token = req.cookies.access_token;
    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ valid: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true });
    } catch (error) {
        res.status(401).json({ valid: false });
    }
});
