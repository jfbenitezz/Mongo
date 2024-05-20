const mongoose = require('mongoose');
const express = require('express');

const mongoURI = 'mongodb://localhost/Property';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.err("Connection to db failed", err);
        process.exit(1)
    }
};

module.exports = connectDB;

