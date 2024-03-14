import { cellModifierSelectorComplex } from "./cellModifierSelectorComplex";
import { cellModifierSelectorSimple } from "./cellModifierSelectorSimple";
import { cellModifierValue } from "./cellModifierValue";

class cellModifierSelectorAndValue {
    #cellModifierSelector
    #cellModifierValue
    constructor(modifierValue, modifierSelector = undefined){
        this.#cellModifierSelector = modifierSelector;
        this.#cellModifierValue = modifierValue;
    }

    ToObject() {
        
        return {
            selector : this.#cellModifierSelector?.ToObject(),
            value : this.#cellModifierValue.ToObject(),
        }
    }

    FromObject(val) {
        let selector;
        if(!val.selector){
            selector = undefined;
        }
        else if(val.selector.functionType !== undefined){
            selector = new cellModifierSelectorComplex();
            selector.FromObject(val.selector);
        }
        else if(val.selector.condition !== undefined){
            selector = new cellModifierSelectorSimple();
            selector.FromObject(val);
        }
        let value = new cellModifierValue();
        value.FromObject(val.value);

        this.#cellModifierSelector = selector;
        this.#cellModifierValue = value;
    }

    Evaluate(cellData){
        let result = this.#cellModifierSelector?.Evaluate(cellData) ?? true;
        if(result){
            this.#cellModifierValue.ApplyToCellData(cellData);
        }
    }
}

export {cellModifierSelectorAndValue};