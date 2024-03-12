
class fieldForCheck {
    static RowIdx = new fieldForCheck('rowIdx');
    static ColIdx = new fieldForCheck('idx');

    constructor(name){
        this.name = name;
    } 

    toString(){
        return this.name;
    }

    Equals(value){
        return this.toString() === value.toString();
    }
}

class condition {
    static Eq = new condition('===');
    static Neq = new condition('!===');
    static Gt = new condition('>');
    static Lt = new condition('<');
    static Ge = new condition('>=');
    static Le = new condition('<=');
    static Contains = new condition('contains');

    constructor(name) {
        this.name = name;
    }

    toString(){
        return this.name;
    }

    Equals(value){
        return this.toString() === value.toString();
    }
}

class cellModifierSelectorSimple {

    get condition(){
        return this.#condition;
    }

    #fieldForCheck
    #condition
    #value
    constructor(fieldForCheck, condition, value){
        this.#fieldForCheck = fieldForCheck;
        this.#condition = condition;
        this.#value = value;
    }

    ToObject(){
        return {
            fieldForCheck : this.#fieldForCheck.toString(),
            condition: this.#condition.toString(),
            value : this.#value,
        }
    }

    FromObject(val){
        this.#fieldForCheck = new fieldForCheck(val.fieldForCheck);
        this.#condition = new condition(val.condition);
        this.#value = val.value;
    }

    Evaluate(cellData){
        let selector;
        switch(this.#fieldForCheck.toString()){
            case fieldForCheck.ColIdx.toString():
                selector = (cellData) => cellData.idx;
                break;

            case fieldForCheck.RowIdx.toString():
                selector = (cellData) => cellData.rowIdx;
                break;

            default:
                selector = (cellData) => cellData.text;
        }
        switch(this.#condition.toString()){
            case condition.Eq.toString():
                return selector(cellData) === this.#value;

            case condition.Neq.toString():
                return selector(cellData) !== this.#value;

            case condition.Gt.toString():
                return selector(cellData) > this.#value;

            case condition.Lt.toString():
                return selector(cellData) < this.#value;

            case condition.Ge.toString():
                return selector(cellData) >= this.#value;

            case condition.Le.toString():
                return selector(cellData) <= this.#value;
            
            default:
                return selector(cellData) === this.#value;
        }
    }
}

export {cellModifierSelectorSimple, fieldForCheck, condition};