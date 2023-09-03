const userService = require('../services/service-user');


exports.addUser = (req,res) => {
try {
    userService.addUser(req).then(data => {
        return res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({error : err.message})
    })
} catch (error) {
    res.status(500).send({error : error.message})
}
}