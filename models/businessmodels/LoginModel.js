const Joi = require('joi');

class LoginModel{
    constructor(loginData){
        this.username = loginData.username;
        this.pwd = loginData.pwd;
    }

    static ValidateInput(reqData){
        const loginValidationSchema = {
            username : Joi.string().min(3).max(50).required(),
            pwd: Joi.string().min(3).max(10).required()
        };

        return Joi.validate(reqData, loginValidationSchema);
    }

    get UserName() {return this.username;}
    set UserName(_username) {this.username = _username;}

    get Pwd() {return this.pwd;}
    set Pwd(_pwd) {this.pwd = _pwd;}
}

module.exports =  LoginModel;