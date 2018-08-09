const Joi = require('joi');

const loginValidationSchema = {
    username : Joi.string().min(3).max(50).required(),
    pwd: Joi.string().min(3).max(10).required()
};

class LoginModel{
    constructor(loginData, doValidate = true){
        this.username = loginData.username;
        this.pwd = loginData.pwd;
    
        if(doValidate){
            const { error} = Joi.validate(loginData, loginValidationSchema);
            this.validationerrors = error;
        }
    }

    get UserName() {return this.username;}
    set UserName(_username) {this.username = _username;}

    get Pwd() {return this.pwd;}
    set Pwd(_pwd) {this.pwd = _pwd;}

    get ValidationErrors() {return this.validationerrors;}
    set ValidationErrors(_validationerrors) {this.validationerrors = _validationerrors;}
}

module.exports =  LoginModel;