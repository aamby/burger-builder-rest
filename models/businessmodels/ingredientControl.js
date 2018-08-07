const Joi = require('joi');

const ingredientValidationSchema = {
    label: Joi.string().min(3).required(),
    type: Joi.string().min(3).required(),
    rate: Joi.number().greater(0).required(),
    id: Joi.string().allow(null).optional(),
    createdby: Joi.string().allow(null).optional(),
    createdate: Joi.string().allow(null).optional()
};

class IngredientControlModel{
    constructor(ingCtrlData, doValidate = true){
        this.label = ingCtrlData.label;   
        this.type = ingCtrlData.type;
        this.rate = ingCtrlData.rate;
        if(ingCtrlData.createdby) this.createdby = ingCtrlData.createdby;
        if(ingCtrlData.createdon) this.createdate = ingCtrlData.createdon;
        if(ingCtrlData._id) this.id = ingCtrlData._id;
    
        if(doValidate){
            const { error} = Joi.validate(ingCtrlData, ingredientValidationSchema);
            this.validationerrors = error;
        }
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

    get ValidationErrors() {return this.validationerrors;}
    set ValidationErrors(_validationerrors) {this.validationerrors = _validationerrors;}

    static CreateList(ngCtrlsData){
        const ngCtrls = [];
        ngCtrlsData.map(itm => ngCtrls.push(new IngredientControlModel(itm, false)));
        return ngCtrls;
    }
}

module.exports =  IngredientControlModel;