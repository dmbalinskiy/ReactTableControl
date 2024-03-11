import rangeManager from "./rangeManager";

function getVerticalManagerForTable1(){

  let table1VertMgr = new rangeManager(true);

  //range for headers - fixed
  table1VertMgr.createAndAddRange(0, 1, 2, true, true, 
    (cellData) => { cellData.isHeader = true; return cellData;}, 
    (cellData) => { });

  //for sensors - expandable
  table1VertMgr.createAndAddRange(2, 2, 12, false, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for commands - expandable
  table1VertMgr.createAndAddRange(3, 3, 8, false, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for transition sign - fixed
  table1VertMgr.createAndAddRange(4, 4, 1, true, false, 
    (cellData) => cellData, 
    (cellData) => { }); 
  
  //for transition address - fixed
  table1VertMgr.createAndAddRange(5, 5, 1, true, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for prohibited combination - fixed
  table1VertMgr.createAndAddRange(6, 6, 1, true, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  return table1VertMgr;
}

function getHorizontalManagerForTables(){
    let horManager = new rangeManager(false);

    //range for headers - fixed
    horManager.createAndAddRange(0, 1, 2, true, true, 
        (cellData) => { 
            cellData.isHeader = true;  
            if(cellData.rowIdx === 0 && cellData.idx > 1){
                cellData.classes = `vertical ${cellData.classes ?? ''}`
            }
            return cellData;
        }, 
        (cellData) => { });

    horManager.createAndAddRange(2, 2, 128, false, false, 
        (cellData) => { return cellData;}, 
        (cellData) => { });

    return horManager;
}

function getVerticalManagerForTable2(){
  let table2VertMgr = new rangeManager(true);

  //range for headers - fixed
  table2VertMgr.createAndAddRange(0, 1, 2, true, true, 
    (cellData) => { cellData.isHeader = true; return cellData;}, 
    (cellData) => { });

  //for transition address
  table2VertMgr.createAndAddRange(2, 2, 1, true, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for logic operation type - fixed
  table2VertMgr.createAndAddRange(3, 3, 1, true, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for sensors - expandable
  table2VertMgr.createAndAddRange(4, 4, 12, false, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  //for commands - expandable
  table2VertMgr.createAndAddRange(5, 5, 8, false, false, 
    (cellData) => cellData, 
    (cellData) => { }); 

  return table2VertMgr;
}


export {
    getVerticalManagerForTable1, 
    getVerticalManagerForTable2,
    getHorizontalManagerForTables

}