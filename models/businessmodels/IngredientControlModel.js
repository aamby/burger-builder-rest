const Joi = require('joi');

class IngredientControlModel{
    constructor(ingCtrlData, reqUser = null){
        this.id = ingCtrlData.id;
        this.label = ingCtrlData.label;   
        this.type = ingCtrlData.type;
        this.rate = ingCtrlData.rate;
        if(ingCtrlData.createdby) this.createdby = ingCtrlData.createdby; 
        else if(reqUser) this.createdby = reqUser;
        if(ingCtrlData.createdate) this.createdate = ingCtrlData.createdate;
    }

    static ValidateInput(reqData){       
        const ingredientValidationSchema = {
            id: Joi.number().greater(0).required(),
            label: Joi.string().min(3).max(50).required(),
            type: Joi.string().min(3).max(50).required(),
            rate: Joi.number().greater(0).required(),
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