
import {addIfNotContains, removeIfContains, replace } from './utils'

class cellModifierValue {
    
    #classesToRemove = []
    get classesToRemove(){
        return this.#classesToRemove;
    }
    set classesToRemove(value){
        this.#classesToRemove = value;
    }

    #classesToAdd = []
    get classesToAdd() {
        return this.#classesToAdd;
    }
    set classesToAdd(value) {
        this.#classesToAdd = value;
    }

    #isVirtualValue = undefined
    getIsVirtual(){
        return this.#isVirtualValue;
    }
    setIsVirtual(value){
        this.#isVirtualValue = value;
    }

    #isHeaderValue = undefined
    getIsHeader(){
        return this.#isHeaderValue;
    }
    setIsHeader(value){
        this.#isHeaderValue = value;
    }

    ToObject(){
        return {
            classesToAdd: this.#classesToAdd,
            classesToRemove: this.#classesToRemove,
            isVirtual: this.#isVirtualValue,
            isHeader : this.#isHeaderValue,
        }
    }

    FromObject(val) {
        var cmv = new cellModifierValue();
        cmv.classesToAdd = val.classesToAdd;
        cmv.classesToRemove = val.classesToRemove;
        cmv.isVirtual = val.isVirtual;
        cmv.isHeader = val.isHeader;
    }

    ApplyToCellData(cellData){
        for (let cl of this.#classesToRemove){
            cellData.classes = removeIfContains(cl, cellData.classes);
        }
        for (let cl of this.#classesToAdd){
            cellData.classes = addIfNotContains(cl, cellData.classes)
        }
        if(this.#isVirtualValue !== undefined){
            cellData.isVirtual = this.#isVirtualValue;
        }
        if(this.#isHeaderValue !== undefined){
            cellData.isHeader = this.#isHeaderValue;
        }
    }
}

export {cellModifierValue};