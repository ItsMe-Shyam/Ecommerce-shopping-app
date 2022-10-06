
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 15,
        trim: true

    },
    description: {
        type: String,
        required: true ,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        maxlength: [8, 'stock cannot exceed 8 characters']

    },
    category: {
        type: String,
        required: [true, 'please enter the product category']
    },
    stock: {
        type: Number,
        required: true,
        maxlength: [10, 'stock cannot exceed 10'],
        default: 1
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }

        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);