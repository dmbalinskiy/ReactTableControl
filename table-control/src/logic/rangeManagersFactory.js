import rangeManager from "./rangeManager";
import {addIfNotContains, removeIfContains, replace } from './utils'
import { cellModifierValue } from "./cellModifierValue";
import { cellModifierSelectorSimple } from "./cellModifierSelectorSimple";
import { cellModifierSelectorComplex } from "./cellModifierSelectorComplex";
import { cellModifierSelectorAndValue } from "./cellModifierSelectorAndValue";

function getVerticalManagerForTable1(){

  let table1VertMgr = new rangeManager(true);

  //range for headers - fixed
  table1VertMgr.createAndAddRange(2, 2, true, true, 
    (cellData) => { 
        cellData.classes = removeIfContains('vertical', cellData.classes); 
        cellData.isHeader = true; 
        return cellData;
      
      }, 

    (cellData) => cellData
    );

  //for sensors - expandable
  table1VertMgr.createAndAddRange(1, 12, false, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => {cellDataClickHandler(cellData)} ); 

  //for commands - expandable
  table1VertMgr.createAndAddRange(1, 8, false, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => {cellDataClickHandler(cellData)} ); 

  //for transition sign - fixed
  table1VertMgr.createAndAddRange(1, 1, true, true, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 
  
  //for transition address - fixed
  table1VertMgr.createAndAddRange(1, 1, true, true, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 

  //for prohibited combination - fixed
  table1VertMgr.createAndAddRange(1, 1, true, true, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData },  
    (cellData) => { }); 

  //for virtual items - fixed
  table1VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => { 
        cellData.classes = removeIfContains('vertical', cellData.classes); 
        cellData.isVirtual = true; 
        if(cellData.rowIdx === 0 || cellData.rowIdx === 1){
              cellData.isExportImportCell = true;
              cellData.classes = addIfNotContains('exportImport', cellData.classes)
        }
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
    (cellData) => { 
        cellData.classes = removeIfContains('vertical', cellData.classes); 
        cellData.isHeader = true; 
        return cellData;}, 

    (cellData) => cellData
    );

  //for transition address - fixed
  table2VertMgr.createAndAddRange(1, 1, true, true, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 

  //for logic operation type - fixed
  table2VertMgr.createAndAddRange(1, 1, true, true, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => { }); 

    //for sensors - expandable
  table2VertMgr.createAndAddRange(1, 12, false, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => {cellDataClickHandler(cellData)} ); 
  
    //for commands - expandable
  table2VertMgr.createAndAddRange(1, 8, false, false, 
    (cellData) => { cellData.classes = addIfNotContains('narrow', cellData.classes); return cellData }, 
    (cellData) => {cellDataClickHandler(cellData)} ); 

  //for virtual items - fixed
  table2VertMgr.createAndAddRange(1, 1, true, false, 
    (cellData) => { 
        cellData.classes = removeIfContains('vertical', cellData.classes); 
        cellData.isVirtual = true; 
        return cellData;}, 
    (cellData) => { }); 

  return table2VertMgr;
}

function cellDataClickHandler (cellData) {
  console.log("cellDataClickHandler");

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
  console.log(cellData);
}

export {
    getVerticalManagerForTable1, 
    getVerticalManagerForTable2,
    getHorizontalManagerForTables,
    cellDataClickHandler

}