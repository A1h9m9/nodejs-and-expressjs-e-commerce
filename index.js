const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/user');
const product = require('./routes/product');
const order = require('./routes/order');
const compression = require('compression');
const session = require('express-session'); // Import express-session
const app = express();

// Static files
app.use(express.static('public'));

// Middleware لـ compressing
app.use(compression());

// Middleware لـ json
app.use(express.json());

// Setup session
app.use(session({
    secret: 'your-secret-key',  // You can replace this with a stronger secret like :secret: 'gW$8#dK9!mL2@xV7pQz&TfY1cN4^rH5o'
    resave: false,              
    saveUninitialized: true,    
    cookie: { secure: false }   
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/appblog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use(users);
app.use(product);
app.use(order);

// Middleware للأخطاء (يأتي في النهاية)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
