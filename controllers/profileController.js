const Profile = require('../models/profile');
const User = require('../models/user');

// Lấy thông tin hồ sơ cá nhân
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('ownerId', '-password');
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        // Kiểm tra xem người yêu cầu có phải là chủ sở hữu của hồ sơ không
        if (profile.ownerId._id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Cập nhật thông tin hồ sơ cá nhân
exports.updateProfile = async (req, res) => {
    const { fullName, dateOfBirth, placeOfBirth, nationality, education } = req.body;
    const profileFields = { fullName, dateOfBirth, placeOfBirth, nationality, education };
    try {
        let profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        // Kiểm tra xem người yêu cầu có phải là chủ sở hữu của hồ sơ không
        if (profile.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        profile = await Profile.findByIdAndUpdate(
            req.params.id,
            { $set: profileFields },
            { new: true }
        );
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
};
