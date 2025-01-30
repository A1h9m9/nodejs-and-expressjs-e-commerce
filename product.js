const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        maxlength:100
    },
    description: {
        type: String,
        required:true,
        maxlength:200
    },
    price: {
        type: Number,
        required:true,
        min: [0.01, "Price must be greater than zero"],
        validate: {
          validator: (value) => Number(value.toFixed(2)) === value,
          message: "Price can only have up to two decimal places",
        },
    },
    category: {
        type: String,
        required:true
    },
    brand: {
        type: String,
        required:true,
        maxlength: [50, "Brand name must not exceed 50 characters"],

    },

    rating: {
        type: Number,
        required:true,
        min: [0, "Rating cannot be less than 0"],
        max: [5, "Rating cannot exceed 5"],
        validate: {
          validator: (value) => Number(value.toFixed(1)) === value,
          message: "Rating must have at most one decimal place",
        },
    },
    image: {
        type: String,
        match: [
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/,
            "Image URL must be a valid link to an image",
          ],
    },
    inStock:{
        type: String,
        enum: ['inStock', 'outOfStock'],
        default: 'inStock',
        
    },
    isAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    }

});

const Product = mongoose.model('Product', Schema);
module.exports = Product;