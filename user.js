const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: async function (value) {
                const existuser = await User.exists({ username: value });
                return !existuser;
            },
            message: 'User already exist'
        }
    },
    name: {

        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                const existemail = await User.exists({ email: value });
                return !existemail;
            },
            message: 'Email already exist'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

});

// pre hash password middleware
Schema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) { // Check if password was modified
        try {
            const hashedPassword = bcrypt.hash(this.password, 10); // Wait for the hash to complete
            this.password = hashedPassword; // Assign the hashed password
            next(); // Continue with the save
        } catch (err) {
            next(err); // Pass the error to next middleware
        }
    } else {
        next(); // If no password modification, proceed
    }
});


const User = mongoose.model('User', Schema);
module.exports = User;