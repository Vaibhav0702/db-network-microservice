
const bcrypt = require('bcrypt');



const User = require('../models/model-user');


//register user
exports.registerUser = async (userData) => {
    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            throw new Error('User already registered with this email');
        }

        // Check password complexity rules
        const passwordRegex = /^(?=.*[a-zA-Z\d@$!%*?&]).{6,}$/;

        if (!passwordRegex.test(userData.password)) {
            throw new Error('Password does not meet the criteria (minimum 6 characters required).');
        }


        // Hash the user's password
        const hashedPassword = await bcrypt.hash(userData.password, 10); // Adjust the number of salt rounds as needed

        // Create a new user with the hashed password
        const newUser = new User({
            username: userData.username,
            email: userData.email,
            number : userData.number,
            password: hashedPassword, // Store the hashed password in the database
        });

        const response = await newUser.save();

        // Create a copy of the response object and remove the password property
        const data = { ...response._doc };
        delete data.password;

        console.log("data ", data)

        return data;
    } catch (error) {
        // Handle any errors that occur during user registration
        throw error;
    }
}


//login user
exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            // User not found
            throw new Error('USER_NOT_FOUND');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Invalid password
            throw new Error('INVALID_CREDENTIALS');
        }

        // Return the authenticated user data (excluding the password)
        const userData = { ...user._doc };
        delete userData.password;

        return userData;
    } catch (error) {
        // Handle different error scenarios
        switch (error.message) {
            case 'USER_NOT_FOUND':
                throw new Error('User not found.');
            case 'INVALID_CREDENTIALS':
                throw new Error('Invalid credentials.');
            default:
                // Handle other errors, log them, and rethrow if needed
                throw error;
        }
    }
};



// Function to update user profile
exports.updateUser = async (userId, updatedUserData) => {
    try {
        // Define the update operation
        const updateOperation = {
            $set: updatedUserData, // Use the updated user data to set new values
        };

        // Find the user by ID and update their information
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateOperation, {
            new: true, // Return the updated document
        });

        if (!updatedUser) {
            throw new Error('User not found'); // Handle the case when the user is not found
        }


        // Return the authenticated user data (excluding the password)
        const userData = { ...updatedUser._doc };
        delete userData.password;


        return userData;
    } catch (error) {
        // Handle different error scenarios
        throw error;
    }
};


// Function to get user information by ID
exports.getUserById = async (userId) => {
    try {
      // Find the user by ID in the database
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Exclude sensitive data (e.g., password) from the user object
      const userData = { ...user._doc };
      delete userData.password;
  
      return userData;
    } catch (error) {
      throw error;
    }
  };



// Function to change user password
exports.changePassword = async (userId, currentPassword, newPassword) => {
    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Verify the current password
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!passwordMatch) {
        throw new Error('Incorrect current password');
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Adjust the number of salt rounds as needed
  
      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();
    } catch (error) {
      throw error;
    }
  };