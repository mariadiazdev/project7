const express = require('express');
const authRoutes = require('./routes/user');
const path = require('path');
const app = express();




// CORS Headers
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

app.use('/media', express.static(path.join(__dirname, 'media'))); //upload images
app.use(express.json()); // Parses JSON payloads

app.use('/api/auth', authRoutes);
module.exports = app;