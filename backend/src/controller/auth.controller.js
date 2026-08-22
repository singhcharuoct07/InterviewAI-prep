const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const authCookieOptions = {
    httpOnly: true,
    path: "/",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    secure: process.env.NODE_ENV === "production"
};

/**
 * @route POST /api/auth/register
 * @description register a new user, expects username, password and email
 * @access public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "please fill empty fields"
            });
        }
        const isUserAlreadyExist = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: "account already exist with username or email id"
            });
        }
        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash
        });
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, authCookieOptions);

        return res.status(201).json({
            message: "user Registered Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * @route POST /api/auth/login
 * @description login a user
 * @access public
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "please fill empty fields"
            });
        }

        // Must explicitly select password because select: false is set in schema
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, authCookieOptions);

        return res.status(200).json({
            message: "user logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add token to blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({ token });
        }

        res.clearCookie("token", authCookieOptions);

        return res.status(200).json({
            message: "user logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * @name getmecontroller
 * @description get details of the current logged in user
 */
async function getmecontroller(req, res) {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "user detail fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getmecontroller
};
