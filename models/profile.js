const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    fullName: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    nationality: String,
    education: String,
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
