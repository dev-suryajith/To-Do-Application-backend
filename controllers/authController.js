const bcrypt = require("bcryptjs");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    console.log("Inside registerUser");
    
    const { userName, email, password } = req.body
    console.log({ userName, email, password })
    const userExists = await users.findOne({ email });
    try {
        if (userExists) {
            console.log(userExists);
            res.status(404).json("User already exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new users({
                userName,
                email,
                password: hashedPassword,
                // password,
            })
            await newUser.save()
            var token = jwt.sign({ email }, process.env.JWT_SecretKey);
            res.status(200).json({ newUser, token })
        }
    } catch (err) {
        console.log({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

            if (isPasswordMatch) {
                const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SecretKey);
                res.status(200).json({ existingUser, token });
            } else {
                res.status(401).json("Incorrect Password");
            }
        } else {
            res.status(404).json("User Not Found");
        }
    } catch (error) {
        res.status(500).json(`Error logging in user : ${error}`);
    }
};
