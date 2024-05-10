const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng mới
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'your_secret_key', // Thay thế 'your_secret_key' bằng khóa bí mật thực tế của bạn
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Đăng xuất người dùng
exports.logoutUser = async (req, res) => {
    // Đăng xuất là quá trình frontend xóa token khỏi lưu trữ
    // Nên API này không cần thực hiện thao tác nào trên server
    res.status(200).send('User logged out successfully');
};
