const Profile = require('../models/profile');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ msg: 'Profile not found' });

        if (profile.ownerId.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateProfile = async (req, res) => {
    const { fullName, dateOfBirth, placeOfBirth, nationality, education } = req.body;
    try {
        let profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ msg: 'Profile not found' });

        if (profile.ownerId.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

        profile = await Profile.findByIdAndUpdate(req.params.id, { fullName, dateOfBirth, placeOfBirth, nationality, education }, { new: true });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
