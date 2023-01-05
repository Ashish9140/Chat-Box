const router = require('express').Router();
const UserModal = require('./models/UserModal');
const ChatModal = require('./models/ChatModal');
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const sendEmail = require('./SendEmail');
const middleware = require("./middleware");
const multer = require("multer");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

router.get("/", async (req, res) => {
    res.json({ message: "Hello Clone" });
})

/****************************User Authentication*********************** */

// user register
router.post("/user/signup", async (req, res) => {
    try {
        const { email, name, password, avatar } = req.body;
        let user;
        user = await UserModal.findOne({ email });
        if (user) {
            return res.status(409).send({ message: "User given email already exist" });
        }

        const hashPassword = await bcrypt.hash(password, salt);

        user = await UserModal.create({ email, name, password: hashPassword, avatar });

        const token = jwt.sign({ _id: user._id }, accessTokenSecret, { expiresIn: '7d' });
        res.status(201).send({ user: user, token: token, message: "User created successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

})

// user login
router.post("/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });
        const token = jwt.sign({ _id: user._id }, accessTokenSecret, { expiresIn: '7d' });

        return res.status(200).send({ user: user, token: token, message: "Logged Successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

// user refresh
router.post("/user/refresh", middleware, async (req, res) => {
    try {
        const { token } = req.body;
        let userData;
        try {
            userData = jwt.verify(token, accessTokenSecret);
        } catch (err) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const user = await UserModal.findOne({ _id: userData._id });
        if (!user) {
            return res.status(401).send({ message: "Invalid Token" });
        }
        const newToken = jwt.sign({ _id: user._id }, accessTokenSecret, { expiresIn: '7d' });
        return res.status(200).send({ user: user, token: newToken, message: "Logged Successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

/****************************Password Reset*********************** */

// send reset link
router.post("/user/forget-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(409).send({ message: "User with given email does not exist" });
        }
        const url = `${process.env.BASE_URL}user/password-reset/${user._id}/`;
        await sendEmail(user.email, "Password Reset", url);
        res.status(200).send({ message: "Password reset link sent to your email account" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

// verify link
router.get("/user/password-reset/:id", async (req, res) => {
    try {
        const user = await UserModal.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).send({ message: "Invalid link" });
        }
        res.status(200).send("Valid Url");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

// set new password
router.post("/user/password-reset/:id", async (req, res) => {
    try {
        const user = await UserModal.findOne({ _id: req.params.id });
        const { password } = req.body;
        if (!user) {
            return res.status(400).send({ message: "Invalid link" });
        }

        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        await user.save();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});



// Post all users
router.post("/allrooms", middleware, async (req, res) => {
    try {
        const users = await UserModal.find();
        return res.status(200).send({ alluser: users, message: "All the users" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

// post chats
router.post("/chats", middleware, async (req, res) => {
    try {
        const { roomId } = req.body;
        const chatData = await ChatModal.find({ room: roomId });
        res.json(chatData);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

// handle Multer Event
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage }).single('avatar');
router.post("/upload/file", async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            return res.json({ messages: "uploading error" });
        } else {
            const { _id } = req.body;
            // const user = await UserModal.find({ _id });
            await UserModal.findByIdAndUpdate(_id, {
                avatar: res.req.file.path
            })
            return res.json({ messages: "uploaded", url: res.req.file.path });
        }
    })
})



module.exports = router