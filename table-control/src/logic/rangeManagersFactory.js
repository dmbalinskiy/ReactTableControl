import rangeManager from "./rangeManager";

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

function getVerticalManagerForTable1(){

  let table1VertMgr = new rangeManager(true);

  //range for headers - fixed
  table1VertMgr.createAndAddRange(2, 2, true, true, 
    (cellData) => { 
        cellData.classes = removeIfContains('vertical', cellData.classes); 
        cellData.isHeader = true; 
        return cellData;}, 
    (cellData) => { });

  //for sensors - expandable
  table1VertMgr.createAndAddRange(1, 12, false, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 

  //for commands - expandable
  table1VertMgr.createAndAddRange(1, 8, false, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 

  //for transition sign - fixed
  table1VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 
  
  //for transition address - fixed
  table1VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 

  //for prohibited combination - fixed
  table1VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData },  
    (cellData) => { }); 

  //for virtual items - fixed
  table1VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => { 
        cellData.classes = removeIfContains('vertical', cellData.classes); 
        cellData.isVirtual = true; 
        return cellData;}, 
    (cellData) => { }); 

  return table1VertMgr;
}

function getHorizontalManagerForTables(){
    let horManager = new rangeManager(false);

    //range for headers - fixed
    horManager.createAndAddRange(2, 2, true, true, 
        (cellData) => { 
            cellData.isHeader = true;  
            if(cellData.rowIdx === 0 && cellData.idx > 1){
                cellData.classes = addIfNotContains('vertical', cellData.classes);
            }
            if(cellData.idx === 1){
                cellData.classes = addIfNotContains('narrow', cellData.classes);
            }
            return cellData;
        }, 
        (cellData) => { });

    horManager.createAndAddRange(1, 128, false, false, 
        (cellData) => { return cellData;}, 
        (cellData) => { });
    
    //for virtual items - fixed
    horManager.createAndAddRange(1, 1, true, false, 
        (cellData) => { 
            cellData.classes = addIfNotContains('vertical', cellData.classes);
            cellData.isVirtual = true; 
            return cellData;}, 
        (cellData) => { }); 

    return horManager;
}

function getVerticalManagerForTable2(){
  let table2VertMgr = new rangeManager(true);

  //range for headers - fixed
  table2VertMgr.createAndAddRange(2, 2, true, true, 
    (cellData) => { cellData.isHeader = true; return cellData;}, 
    (cellData) => { });

  //for transition address
  table2VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for logic operation type - fixed
  table2VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for sensors - expandable
  table2VertMgr.createAndAddRange(1, 12, false, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for commands - expandable
  table2VertMgr.createAndAddRange(1, 8, false, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for virtual items - fixed
  table2VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => { cellData.isVirtual = true; return cellData;}, 
    (cellData) => { }); 

  return table2VertMgr;
}


export {
    replace,
    addIfNotContains,
    removeIfContains,
    getVerticalManagerForTable1, 
    getVerticalManagerForTable2,
    getHorizontalManagerForTables

}