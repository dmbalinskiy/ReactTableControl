class FunctionType {
    static And = new FunctionType('&&');
    static Or = new FunctionType('||');
    static Not = new FunctionType('!');

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

class cellModifierSelectorComplex {
    
    #functionType
    get FunctionType(){
        return this.#functionType;
    }

    #arguments
    constructor(functionType, ...args){
        this.#functionType = functionType;
        this.#arguments = args;
    }

    ToObject() {
        return {
            functionType : this.#functionType.toString(),
            arguments : this.#arguments,
        }
    }

    FromObject(val) {
        this.#functionType = new FunctionType(val.functionType);
        this.arguments = val.arguments;
    }

    Evaluate(cellData){

        let result = false;
        if(this.#functionType.toString() === FunctionType.Not.toString()){
            result = !(this.#arguments[0].Evaluate(cellData));
        }
        else if(this.#functionType.toString() === FunctionType.And.toString()){
            result = true;
            for(let arg of this.#arguments){
                result = result && arg.Evaluate(cellData);
                if(!result){
                    break;
                }
            }
        }
        else if(this.#functionType.toString() === FunctionType.Or.toString()){
            for(let arg of this.#arguments){
                result = result || arg.Evaluate(cellData);
                if(result){
                    break;
                }
            }
        }
        return result;
    }
}

export {cellModifierSelectorComplex, FunctionType}