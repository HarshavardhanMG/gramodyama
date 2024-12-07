const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    videos: [{
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }],
    articles: [{
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }],
    image: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expert', expertSchema);