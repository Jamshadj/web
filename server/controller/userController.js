const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../utils/tokenUtils');

module.exports = {
    postSignup: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const oldUser = await userModel.findOne({ email });
            if (oldUser) {
                return res.status(400).json({ err: true, message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({ name, email, password: hashedPassword });

            const token = generateToken(user._id);

            return res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                sameSite: 'strict',
            }).status(201).json({ err: false, message: 'User registration success' });
        } catch (error) {
            next(error);
        }
    },

    postLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ err: true, message: 'No user found, please signup' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ err: true, message: 'Invalid password' });
            }

            const token = generateToken(user._id);

            return res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                sameSite: 'strict',
            }).json({ err: false, message: 'User login success' });
        } catch (error) {
            next(error);
        }
    },

    getLogout: (req, res) => {
        return res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0, // Expire immediately
            sameSite: 'strict',
        }).json({ err: false, message: 'Logged out successfully' });
    },

    checkAuth: async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ logged: false, err: true, message: 'No token' });
            }

            const decoded = verifyToken(token);
            const user = await userModel.findById(decoded.id, { password: 0 });

            if (!user) {
                return res.status(404).json({ logged: false, err: true, message: 'User not found' });
            }

            return res.json({ logged: true, details: user });
        } catch (error) {
            next(error);
        }
    },

    editProfile: async (req, res, next) => {
        try {
            const { id, name } = req.body;
            const image = req.file;

            const result = await userModel.updateOne(
                { _id: id },
                { $set: { name, image } }
            );

            if (result.nModified === 0) {
                return res.status(400).json({ err: true, message: 'Profile not updated' });
            }

            return res.json({ err: false, message: 'Profile updated successfully' });
        } catch (error) {
            next(error);
        }
    }
};
