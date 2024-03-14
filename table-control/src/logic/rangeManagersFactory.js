import rangeManager from "./rangeManager";
import {addIfNotContains, removeIfContains, replace } from './utils'
import { cellModifierValue } from "./cellModifierValue";
import { cellModifierSelectorSimple, condition, fieldForCheck } from "./cellModifierSelectorSimple";
import { FunctionType, cellModifierSelectorComplex } from "./cellModifierSelectorComplex";
import { cellModifierSelectorAndValue } from "./cellModifierSelectorAndValue";

function getVerticalManagerForTable1(){

  let table1VertMgr = new rangeManager(true);

  //range for headers - fixed
  table1VertMgr.createAndAddRange(2, 2, true, true, -1, 
    () => { 

        let value = new cellModifierValue();
        value.isHeader = true;
        value.classesToRemove.push('vertical');
        return [ new cellModifierSelectorAndValue(value)];
      }, 
    );

  //for sensors - expandable
  table1VertMgr.createAndAddRange(1, 12, false, false, 1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    }); 

  //for commands - expandable
  table1VertMgr.createAndAddRange(1, 8, false, false, 1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    }); 

  //for transition sign - fixed
  table1VertMgr.createAndAddRange(1, 1, true, true, -1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    }); 
  
  //for transition address - fixed
  table1VertMgr.createAndAddRange(1, 1, true, true, -1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    }); 

  //for prohibited combination - fixed
  table1VertMgr.createAndAddRange(1, 1, true, true, -1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    }); 

  //for virtual items - fixed
  table1VertMgr.createAndAddRange(1, 1, true, false, -1, 
    (cellData) => { 
        let modifiersArray = [];

        let value = new cellModifierValue();
        value.classesToRemove.push('vertical');
        value.isVirtual = true;
        modifiersArray.push(new cellModifierSelectorAndValue(value));


        value = new cellModifierValue();
        value.isExportImport = true;
        value.classesToAdd.push('exportImport');

        let logicFcn = new cellModifierSelectorComplex(
          FunctionType.Or, 
          new cellModifierSelectorSimple(fieldForCheck.RowIdx, condition.Eq, 0),
          new cellModifierSelectorSimple(fieldForCheck.RowIdx, condition.Eq, 1))
        modifiersArray.push(new cellModifierSelectorAndValue(value, logicFcn));
        console.log(modifiersArray);
        return modifiersArray;}); 

  return table1VertMgr;
}

function getHorizontalManagerForTables(){
    let horManager = new rangeManager(false);

    //range for headers - fixed
    horManager.createAndAddRange(2, 2, true, true, -1,
        () => { 
          
            let modifiersArray = [];

            let value = new cellModifierValue();
            value.isHeader = true;
            modifiersArray.push(new cellModifierSelectorAndValue(value));
  
            value = new cellModifierValue();
            value.isExportImport = true;
            value.classesToAdd.push('vertical');
            let logicFcn = new cellModifierSelectorComplex(
              FunctionType.And, 
              new cellModifierSelectorSimple(fieldForCheck.RowIdx, condition.Eq, 0),
              new cellModifierSelectorSimple(fieldForCheck.ColIdx, condition.Gt, 1))
            modifiersArray.push(new cellModifierSelectorAndValue(value, logicFcn));

            value = new cellModifierValue();
            value.classesToAdd.push('narrow');
            logicFcn = new cellModifierSelectorSimple(fieldForCheck.RowIdx, condition.Eq, 1);
            modifiersArray.push(new cellModifierSelectorAndValue(value, logicFcn));

            return modifiersArray;
        });

    horManager.createAndAddRange(1, 128, false, false, -1, () => []);
    
    //for virtual items - fixed
    horManager.createAndAddRange(1, 1, true, false, -1,
        () => { 
            let value = new cellModifierValue();
            value.classesToAdd.push('vertical');
            value.isVirtual = true;
            return [new cellModifierSelectorAndValue(value)];
        }); 

    return horManager;
}

function getVerticalManagerForTable2(){
  let table2VertMgr = new rangeManager(true);

  //range for headers - fixed
  table2VertMgr.createAndAddRange(2, 2, true, true, -1,
    () => {
      let value = new cellModifierValue();
      value.isHeader = true;
      value.classesToRemove.push('vertical');
      return [ new cellModifierSelectorAndValue(value)];
    });

  //for transition address - fixed
  table2VertMgr.createAndAddRange(1, 1, true, true, -1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    } ); 

  //for logic operation type - fixed
  table2VertMgr.createAndAddRange(1, 1, true, true, -1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    } ); 

    //for sensors - expandable
  table2VertMgr.createAndAddRange(1, 12, false, false, -1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    } ); 
  
    //for commands - expandable
  table2VertMgr.createAndAddRange(1, 8, false, false, -1,
      () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('narrow');
        return [ new cellModifierSelectorAndValue(value)];
    }); 

  //for virtual items - fixed
  table2VertMgr.createAndAddRange(1, 1, true, false, -1,
    () => {
      let value = new cellModifierValue();
        value.classesToAdd.push('vertical');
        value.isVirtual = true;
        return [ new cellModifierSelectorAndValue(value)];
    });

    return table2VertMgr;
}

function cellDataClickHandler (cellData) {

  cellData.classes = removeIfContains('ok', cellData.classes); 
  cellData.classes = removeIfContains('warning', cellData.classes); 
  cellData.classes = removeIfContains('error', cellData.classes); 

  if(!cellData.text || cellData.text === ""){
    cellData.text = '10';
    cellData.classes = addIfNotContains('ok', cellData.classes);
  }
  else if(cellData.text === '10'){
    cellData.text = '11';
    cellData.classes = addIfNotContains('warning', cellData.classes);
  }
  else if(cellData.text === '11'){
    cellData.text = '01';
    cellData.classes = addIfNotContains('error', cellData.classes);
  }
  else if(cellData.text === '01'){
    cellData.text = '';
  }
}

export {
    getVerticalManagerForTable1, 
    getVerticalManagerForTable2,
    getHorizontalManagerForTables,
    cellDataClickHandler

}