
require('dotenv').config()

const { promise, reject } = require('bcrypt/promises');
const jwt = require("jsonwebtoken");



const verifyToken =(token) => {

   return new Promise ((resolve,reject) => {


    var decoded = jwt.verify(token, process.env.tokenSecretKey , (err,decoded) => {

        if(err)
        {
            return reject(err);
        }
        else{
            return resolve(decoded);
        }
             
         }); 
     


   });

}





const authenticate = async (req,res,next) =>{
     if(!req.headers.authorization)
     {
         return res.status(400).send({message:"Authorization token Not found or Incorrect"});
     }
    

     if(!req.headers.authorization.startsWith("Bearer "))
     {
        return res.status(400).send({message:"Authorization token Not found or Incorrect"});
     }

     const token = req.headers.authorization.trim().split(" ")[1];

     let decoded;

    try{

        decoded = await verifyToken(token);
    }
    catch(err)
    {
                console.log(err);
                return res.status(400).send({message:"Authorization token Not found or Incorrect"})
    }

    console.log(decoded);
    req.user = decoded.user; // getting the details from the local 
    return next();

  
}

module.exports = authenticate;