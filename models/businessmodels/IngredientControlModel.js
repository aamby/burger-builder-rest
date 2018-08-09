const Joi = require('joi');

class IngredientControlModel{
    constructor(ingCtrlData){
        this.label = ingCtrlData.label;   
        this.type = ingCtrlData.type;
        this.rate = ingCtrlData.rate;
        if(ingCtrlData.createdby) this.createdby = ingCtrlData.createdby;
        if(ingCtrlData.createdon) this.createdate = ingCtrlData.createdon;
        if(ingCtrlData._id) this.id = ingCtrlData._id;
    }

    get Id() {return this.id;}
    set Id(_id) {this.id = _id;}

    get Label() {return this.label;}
    set Label(_label) {this.label = _label;}

    get Type() {return this.type;}
    set Type(_type) {this.type = _type;}

    get Rate() {return this.rate;}
    set Rate(_rate) {this.rate = _rate;}

    get CreatedBy() {return this.createdby;}
    set CreatedBy(_createdby) {this.createdby = _createdby;}

    get CreateDate() {return this.createdate;}
    set CreateDate(_createdate) {this.createdate = _createdate;}

    static ValidateInput(reqData){       
        const ingredientValidationSchema = {
            label: Joi.string().min(3).max(50).required(),
            type: Joi.string().min(3).max(50).required(),
            rate: Joi.number().greater(0).required(),
            id: Joi.string().allow(null).optional(),
            createdby: Joi.string().allow(null).optional(),
            createdate: Joi.string().allow(null).optional()
        };

        return Joi.validate(reqData, ingredientValidationSchema);
    }

    static CreateList(ngCtrlsData){
        const ngCtrls = [];
        ngCtrlsData.map(itm => ngCtrls.push(new IngredientControlModel(itm)));
        return ngCtrls;
    }
}

module.exports =  IngredientControlModel;