
import {addIfNotContains, removeIfContains, replace } from './utils'

class cellModifierValue {
    
    #classesToRemove = []
    get classesToRemove(){
        return this.#classesToRemove;
    }

    #classesToAdd = []
    get classesToAdd() {
        return this.#classesToAdd;
    }

    #isVirtualValue = undefined
    get isVirtual(){
        return this.#isVirtualValue;
    }
    set isVirtual(value){
        this.#isVirtualValue = value;
    }

    #isHeaderValue = undefined
    get isHeader(){
        return this.#isHeaderValue;
    }
    set isHeader(value){
        this.#isHeaderValue = value;
    }

    #isExportImport = undefined
    get isExportImport() {
        return this.#isExportImport;
    }
    set isExportImport(value){
        this.#isExportImport = value;
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
        this.#classesToAdd = val.classesToAdd;
        this.#classesToRemove = val.classesToRemove;
        this.isVirtual = val.isVirtual;
        this.isHeader = val.isHeader;
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
        if(this.#isExportImport !== undefined){
            cellData.isExportImportCell = this.#isExportImport;
        }
    }
}

export {cellModifierValue};