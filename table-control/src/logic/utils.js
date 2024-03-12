function replace(value, toReplace) {return (value === null || value === undefined) ? toReplace : value; }

function addIfNotContains(valueToAdd, valueToCheck){
    valueToAdd = replace(valueToAdd, '');
    valueToCheck = replace(valueToCheck, '');
    if(!valueToCheck.includes(valueToAdd)){
        valueToCheck = `${valueToAdd} ${valueToCheck}`;
    }
    return valueToCheck;
}

function removeIfContains(valueToRemove, valueToCheck){
    valueToRemove = replace(valueToRemove, '');
    valueToCheck = replace(valueToCheck, '');
    if(valueToCheck.includes(valueToRemove)){
        valueToCheck = valueToCheck.replace(valueToRemove, '');
    }
    return valueToCheck;
}

export {replace, addIfNotContains, removeIfContains}