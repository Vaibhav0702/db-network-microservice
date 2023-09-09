const jwt = require('jsonwebtoken'); // npm json web token laibrary
require('dotenv').config() // dot env laibrary



const userService = require('../services/service-user');





//-----------------generet token
// const generateToken = (user) => {
//      console.log( process.env.tokenSecretKey);
//     return jwt.sign({ user }, process.env.tokenSecretKey); // copy paste from npm json web token laibrary
// }


// Function to generate a JWT token
function generateToken(user) {
    const secretKey = process.env.tokenSecretKey; // Replace with your actual secret key
    const expiresIn = '1h'; // Token expiration time, e.g., 1 hour

    // Create and sign the JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn });

    return token;
}


// add user
exports.register = async (req, res) => {
    try {
        // Get user registration data from the request body
        const userData = req.body;

        // Call the registerUser service function
        const response = await userService.registerUser(userData);


        const token = generateToken(response);

        // Send a successful response with the created user data
        return res.status(201).json({ status: "success", message: 'User registration successful', data: response, token: token });

    } catch (error) {
        // Handle any errors that occur during user registration
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.loginUser(email, password);

        const token = generateToken(user);

        // Return the authenticated user data as a response
        return res.status(200).json({ status: "success", message: 'Login successful', data: user, token: token });
    } catch (error) {
        return res.status(401).json({ status: "fail", error: error.message }); // Unauthorized status code
    }
}


// Logout user
exports.logout = async (req, res) => {
    try {

        // Return a successful response
        return res.status(200).json({
            status: 'success',
            message: 'Logout successful',
        });
    } catch (error) {
        // Handle any errors that occur during logout
        return res.status(500).json({ status: 'fail', message: error.message });
    }
};



// Update user profile
exports.update = async (req, res) => {
    try {
        const userId = req.params.id; // Extract user ID from the request parameters
        const updatedUserData = req.body; // Get updated user data from the request body

        // Call the updateUser service function
        const updatedUser = await userService.updateUser(userId, updatedUserData);

        // Send a successful response with the updated user data
        return res.status(200).json({
            status: 'success',
            message: 'User profile updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        // Handle any errors that occur during user update
        return res.status(500).json({ status: 'fail', message: error.message });
    }
};


// Get user information
exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id; // Extract the user ID from the request parameters

        // Call the getUser service function to retrieve user data
        const user = await userService.getUserById(userId);

        // Return a successful response with the user data
        return res.status(200).json({
            status: 'success',
            message: 'User data retrieved successfully',
            data: user,
        });
    } catch (error) {
        // Handle errors, such as when the user is not found
        return res.status(404).json({ status: 'fail', error: error.message });
    }
};


// Change user password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.params.id; // Extract user ID from the request parameters

        // Call the changePassword service function to handle the password change
        await userService.changePassword(userId, currentPassword, newPassword);

        // Return a successful response
        return res.status(200).json({
            status: 'success',
            message: 'Password changed successfully',
        });
    } catch (error) {
        // Handle password change failures, such as incorrect current password
        return res.status(400).json({ status: 'fail', error: error.message });
    }
};