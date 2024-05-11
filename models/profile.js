const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    placeOfBirth: {
        type: String
    },
    nationality: {
        type: String
    },
    education: {
        type: String
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
