const mongoose =  require('mongoose');

const User = require('../models/model-user');

exports.addUser = async (data) => {

    try {
        const user = await User.find({ email : data.email });

        if(user){
           throw ('User already register');
           return
        }

        const response = await User.create(data);

        return response

    } catch (error) {
        throw (error)
    }

}