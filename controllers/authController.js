const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, canSign } = req.body;
        const user = new User({ name, email, password, role, canSign });
        await user.save();
        res.status(201).json({ message: 'کاربر با موفقیت ثبت شد' });
    } catch (error) {
        res.status(400).json({ error: 'خطا در ثبت کاربر' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'کاربر یافت نشد' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'رمز عبور اشتباه است' });

        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(400).json({ error: 'خطا در ورود' });
    }
};
