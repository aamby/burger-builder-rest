const Joi = require('joi');
const bcrpt = require('bcrypt');

class UserModel{
    constructor(userData){
        this.username = userData.username;   
        this.email = userData.email;
        if(userData.pwd) this.pwd = userData.pwd;
        if(userData.createdate) this.createdate = userData.createdate;
        if(userData._id) this.id = userData._id;
    } 

    static ValidateInput(reqData){
        const userValidationSchema = {
            username : Joi.string().min(3).max(50).required(),
            pwd: Joi.string().min(3).max(10).required(),
            email: Joi.string().min(3).max(255).email().required(),
            id: Joi.string().allow(null).optional(),
            createdate: Joi.string().allow(null).optional()
        };

        return Joi.validate(reqData, userValidationSchema);
    }

    get passhash() {
        const salt = bcrpt.genSalt(10, (err,salt)=>{
            if(salt) return salt;
        });
        const hashed = bcrpt.hash(this.pwd, salt, (err,hash)=>{
            if(hash) return hash;
        });

        return hashed;
    }
}

module.exports =  UserModel;