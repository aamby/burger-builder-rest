const Joi = require('joi');
const bcrpt = require('bcrypt');

class UserModel{
    constructor(userData){
        this.username = userData.username;   
        this.email = userData.email;
        if(userData.pwd) this.pwd = userData.pwd;
        if(userData.createdate) this.createdate = userData.createdate;
        if(userData._id) this.id = userData._id;
        if(userData.isadmin) this.isadmin = userData.isadmin;
        else this.isadmin = false;
    } 

    static ValidateInput(reqData){
        const userValidationSchema = {
            username : Joi.string().min(3).max(50).required(),
            pwd: Joi.string().min(3).max(10).required(),
            email: Joi.string().min(3).max(255).email().required(),
            id: Joi.string().allow(null).optional(),
            createdate: Joi.string().allow(null).optional(),
            isadmin: Joi.boolean().allow(null).optional()
        };

        return Joi.validate(reqData, userValidationSchema);
    }

    //TODO: we can replace these 2 sync calls by async calls or by promise
    getPassHash() {
        const salt = bcrpt.genSaltSync(10);
        const hashed = bcrpt.hashSync(this.pwd, salt);
        return hashed;
    }
}

module.exports =  UserModel;