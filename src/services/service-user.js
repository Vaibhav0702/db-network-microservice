const mongoose =  require('mongoose');

const User = require('../models/model-user');

exports.addUser = async (data) => {

    try {
        const user = await User.find({ email : data.email });

        if(user){
            return res.status(400).send({error: 'User already register'});
        }

        const response = await User.create(data);

        return response

    } catch (error) {
        throw (error)
    }

}