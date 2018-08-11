const Joi = require('joi');
const bcrpt = require('bcrypt');

class UserModel{
    constructor(userData){
        this.id = userData.id;
        this.username = userData.username;   
        this.email = userData.email;
        if(userData.pwd) this.pwd = userData.pwd;
        if(userData.createdate) this.createdate = userData.createdate;
        if(userData.isadmin) this.isadmin = userData.isadmin;
        else this.isadmin = false;
    } 

    static ValidateInput(reqData){
        const userValidationSchema = {
            id: Joi.number().greater(0).required(),
            username : Joi.string().min(3).max(50).required(),
            pwd: Joi.string().min(3).max(10).required(),
            email: Joi.string().min(3).max(255).email().required(),
            createdate: Joi.string().allow(null).optional(),
            isadmin: Joi.boolean().allow(null).optional()
        };

        return Joi.validate(reqData, userValidationSchema);
    }

    async getPassHash() {
        const salt = await bcrpt.genSaltSync(10);
        const hashed = await bcrpt.hashSync(this.pwd, salt);
        return hashed;
    }
}

module.exports =  UserModel;