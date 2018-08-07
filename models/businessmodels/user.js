const Joi = require('joi');

const userValidationSchema = {
    username : Joi.string().min(3).required(),
    pwd: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    id: Joi.string().allow(null).optional(),
    createdate: Joi.string().allow(null).optional()
};

class UserModel{
    constructor(userData, doValidate = true){
        this.username = userData.username;   
        this.email = userData.email;
        if(userData.pwd) this.pwd = userData.pwd;
        if(userData.createdate) this.createdate = userData.createdate;
        if(userData._id) this.id = userData._id;
    
        if(doValidate){
            const { error} = Joi.validate(userData, userValidationSchema);
            this.validationerrors = error;
        }
    } 

    get Id() {return this.id;}
    set Id(_id) {this.id = _id;}

    get UserName() {return this.username;}
    set UserName(_username) {this.username = _username;}

    get Email() {return this.email;}
    set Email(_email) {this.email = _email;}

    get Pwd() {return this.pwd;}
    set Pwd(_pwd) {this.pwd = _pwd;}

    get CreateDate() {return this.createdate;}
    set CreateDate(_createdate) {this.createdate = _createdate;}

    get ValidationErrors() {return this.validationerrors;}
    set ValidationErrors(_validationerrors) {this.validationerrors = _validationerrors;}
}

module.exports =  UserModel;