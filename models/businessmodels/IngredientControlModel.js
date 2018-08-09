const Joi = require('joi');

class IngredientControlModel{
    constructor(ingCtrlData, reqUser = null){
        this.label = ingCtrlData.label;   
        this.type = ingCtrlData.type;
        this.rate = ingCtrlData.rate;
        if(ingCtrlData.createdby) this.createdby = ingCtrlData.createdby; 
        else if(reqUser) this.createdby = reqUser;
        if(ingCtrlData.createdon) this.createdate = ingCtrlData.createdon;
        if(ingCtrlData._id) this.id = ingCtrlData._id;
    }

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