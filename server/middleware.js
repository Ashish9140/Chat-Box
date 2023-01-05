const jwt = require("jsonwebtoken");
const UserModal = require('./models/UserModal');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

module.exports = async function (req, res, next) {
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
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}