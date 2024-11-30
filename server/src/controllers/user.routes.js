const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/jwt.js');
// function for register
const register = async (req, res) => {
    const { name, email, password, dob } = req.body;
    try {
        // check if email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already in used .Please signup with other email" })
        }
        // hash the  password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create a new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            dob,
        })
        // save the user in database
        await user.save();
        // generate jwt token 
        const token = generateToken({ id: user._id, email: user.email })
        // return success response
        return res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
// function for login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Please signup' })
        }
        // compare password
        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
        // generate jwt token 
        const token = generateToken({ id: user._id, email: user.email })
        // return response success
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email, dob: user.dob }
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
//  Function for getting all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); 
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Function for user status
const userStatus = async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body;

    // Validate status input
    const validStatuses = ['active', 'inactive', 'suspended'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {

        const user = await User.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send success response
        res.status(200).json({ message: 'User status updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { register, login ,getUsers,userStatus};
