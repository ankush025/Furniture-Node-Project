const express = require('express');

const reviewRoutes = express.Router();

const verifyToken = require('../../Helper/verifyToken');

const {
    addReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview
} = require('../../Controller/User/review.controller');

reviewRoutes.post('/add', verifyToken, addReview);
reviewRoutes.get('/getAll', verifyToken, getAllReview);
reviewRoutes.get('/getSingle', verifyToken, getReview);
reviewRoutes.put('/update', verifyToken, updateReview);
reviewRoutes.delete('/delete', verifyToken, deleteReview);

module.exports = reviewRoutes;